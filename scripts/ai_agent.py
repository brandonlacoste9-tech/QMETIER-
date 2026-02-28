#!/usr/bin/env python3
"""
AI-Agent Orchestrator for Q-MÉTIER
Watches features/ directory and autonomously generates, tests, builds, and deploys code
"""
import os, sys, time, json, subprocess, pathlib, logging, re, requests
from datetime import datetime
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# -------------------- Config --------------------
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/generate")
MODEL = os.getenv("LLM_MODEL", "thumbtack-codegen")
REPO_ROOT = pathlib.Path(__file__).parents[1]
FEATURES_DIR = REPO_ROOT / "features"
LOG = logging.getLogger("ai-agent")
logging.basicConfig(
    level=logging.INFO,
    filename=REPO_ROOT/"logs/agent.log",
    format="%(asctime)s %(levelname)s %(message)s"
)

def call_ollama(prompt: str) -> str:
    """Call Ollama API for code generation"""
    payload = {
        "model": MODEL,
        "prompt": prompt,
        "stream": False,
        "temperature": 0.0
    }
    r = requests.post(OLLAMA_URL, json=payload, timeout=180)
    r.raise_for_status()
    return r.json()["response"]

def extract_files(response: str) -> dict:
    """Parse markdown headings of the form `# path/to/file.ext`"""
    files = {}
    current = None
    block = []
    for line in response.splitlines():
        m = re.match(r"^#\s+(.+)$", line)
        if m:
            if current:
                files[current] = "\n".join(block).strip()
            current = m.group(1).strip()
            block = []
        else:
            block.append(line)
    if current:
        files[current] = "\n".join(block).strip()
    return files

def write_files(files: dict):
    """Write generated files to repository"""
    for rel_path, content in files.items():
        abs_path = REPO_ROOT / rel_path
        abs_path.parent.mkdir(parents=True, exist_ok=True)
        LOG.info(f"Writing {rel_path}")
        abs_path.write_text(content + "\n")

def run_verification():
    """Run pytest + mypy + eslint"""
    cmds = [
        ["pytest", "-q"],
        ["mypy", "backend"],
        ["npm", "run", "lint", "--prefix", "frontend"],
    ]
    for cmd in cmds:
        LOG.info(f"Running {' '.join(cmd)}")
        subprocess.run(cmd, cwd=REPO_ROOT, check=True)

def docker_build_and_push():
    """Build and push Docker images"""
    services = ["api", "ui", "matcher"]
    for service in services:
        LOG.info(f"Building {service}")
        subprocess.run(
            ["docker", "build", "-t", f"ghcr.io/qmetier/{service}:latest", "."],
            cwd=REPO_ROOT/service, check=True
        )
        subprocess.run(
            ["docker", "push", f"ghcr.io/qmetier/{service}:latest"],
            check=True
        )

def helm_deploy():
    """Deploy via Helm"""
    subprocess.run([
        "helm", "upgrade", "--install", "qmetier",
        "infra/k8s/helm/qmetier",
        "--set", "api.image=ghcr.io/qmetier/api:latest",
        "--set", "ui.image=ghcr.io/qmetier/ui:latest"
    ], cwd=REPO_ROOT, check=True)

def process_feature(file_path: pathlib.Path):
    """Main feature processing pipeline"""
    LOG.info(f"🛠️  Processing feature {file_path.name}")
    feature_md = file_path.read_text()
    
    prompt = f"""You are the senior engineer for Q-MÉTIER marketplace.
Create **all source files** required to implement this feature.
Return each file prefixed with a markdown heading containing the relative path.

Include:
- FastAPI router(s) if backend needed
- Next.js pages/components if UI needed
- Dockerfiles for services
- pytest/jest tests that must pass

Feature description:
{feature_md}
"""
    
    response = call_ollama(prompt)
    files = extract_files(response)
    write_files(files)
    
    # Verify & iterate on failures
    max_tries = 3
    for attempt in range(1, max_tries + 1):
        try:
            run_verification()
            break
        except subprocess.CalledProcessError as e:
            LOG.warning(f"Verification failed (attempt {attempt}/{max_tries})")
            fix_prompt = f"""Tests failed with: {e}
Generate patches to fix the issues. Only output the patch file content."""
            patch_resp = call_ollama(fix_prompt)
            patch_files = extract_files(patch_resp)
            write_files(patch_files)
    else:
        LOG.error("Verification never succeeded – aborting")
        return
    
    # Build & Deploy
    docker_build_and_push()
    helm_deploy()
    LOG.info(f"✅ Feature {file_path.name} delivered to production")

class FeatureHandler(FileSystemEventHandler):
    def on_created(self, event):
        if not event.is_directory and event.src_path.endswith(".md"):
            process_feature(pathlib.Path(event.src_path))

if __name__ == "__main__":
    FEATURES_DIR.mkdir(exist_ok=True)
    observer = Observer()
    observer.schedule(FeatureHandler(), str(FEATURES_DIR), recursive=False)
    LOG.info("🕵️  Watching ./features for new markdown files…")
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
