#!/usr/bin/env python3
"""
Self-Healing Loop for Q-MÉTIER
Monitors Prometheus alerts and auto-fixes infrastructure issues
"""
import requests, json, os, subprocess, logging
from typing import List, Dict

PROM_URL = os.getenv("PROMETHEUS_URL", "http://prometheus:9090/api/v1/query")
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/generate")
MODEL = os.getenv("LLM_MODEL", "thumbtack-codegen")

logging.basicConfig(level=logging.INFO)
LOG = logging.getLogger("auto-heal")

def prometheus_query(q: str) -> List[Dict]:
    """Query Prometheus for alerts"""
    r = requests.get(PROM_URL, params={"query": q})
    r.raise_for_status()
    return r.json()["data"]["result"]

def call_ollama(prompt: str) -> str:
    """Generate healing patch via LLM"""
    payload = {"model": MODEL, "prompt": prompt, "temperature": 0.0, "stream": False}
    r = requests.post(OLLAMA_URL, json=payload, timeout=120)
    r.raise_for_status()
    return r.json()["response"]

def heal():
    """Main healing loop"""
    # Check for high CPU alerts
    alerts = prometheus_query('avg_over_time(container_cpu_usage_seconds_total{namespace="qmetier"}[5m]) > 0.8')
    
    if alerts:
        LOG.info(f"Found {len(alerts)} active alerts")
        
        prompt = """The API pod is consistently >80% CPU.
Write a Helm values patch that increases the API container limits by 50% (both CPU and memory).
Return a markdown heading "# values-patch.yaml" containing the YAML diff."""
        
        yaml_patch = call_ollama(prompt)
        
        # Extract YAML content
        lines = yaml_patch.split('\n')
        yaml_content = '\n'.join([l for l in lines if not l.startswith('#')])
        
        # Apply with helm upgrade
        with open('/tmp/values-patch.yaml', 'w') as f:
            f.write(yaml_content)
        
        subprocess.run([
            "helm", "upgrade", "qmetier", "./infra/k8s/helm/qmetier",
            "--reuse-values",
            "-f", "/tmp/values-patch.yaml"
        ], check=True)
        
        LOG.info("✅ Healing patch applied")
    else:
        LOG.info("No active alerts - system healthy")

if __name__ == "__main__":
    heal()
