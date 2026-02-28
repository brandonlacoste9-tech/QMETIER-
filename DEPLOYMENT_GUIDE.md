# Q-MÉTIER Deployment Guide

Complete guide for deploying Q-MÉTIER to production.

## Prerequisites

- Docker & Docker Compose
- Kubernetes cluster (optional, for production)
- Domain name
- SSL certificate
- Stripe account
- Telegram bot token
- GitHub account (for CI/CD)

## Environment Variables

Create `.env` file with all required variables:

```bash
# Database
POSTGRES_PASSWORD=your_secure_password_here
POSTGRES_DB=qmetier
DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/qmetier

# Redis
REDIS_URL=redis://redis:6379

# Ollama
OLLAMA_URL=http://ollama:11434/api/generate
OLLAMA_EMB=http://ollama:11434/api/embeddings
LLM_MODEL=mixtral
EMB_MODEL=nomic-embed-text

# Stripe
STRIPE_SECRET_KEY=sk_live_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_BOT_URL=http://telegram-bot:8080

# Application
BASE_URL=https://qmetier.ca
API_URL=https://api.qmetier.ca
NEXT_PUBLIC_API_URL=https://api.qmetier.ca
NEXT_PUBLIC_STRIPE_KEY=${STRIPE_PUBLISHABLE_KEY}

# Container Registry
REGISTRY_URL=ghcr.io/your-org

# Monitoring
PROMETHEUS_URL=http://prometheus:9090

# Security
JWT_SECRET=your_jwt_secret_here
ENCRYPTION_KEY=your_encryption_key_here
```

## Deployment Options

### Option 1: Docker Compose (Simple, Single Server)

Best for: Small deployments, testing, single-server setups

```bash
# 1. Build images
docker compose -f docker-compose.prod.yml build

# 2. Start services
docker compose -f docker-compose.prod.yml up -d

# 3. Check status
docker compose ps

# 4. View logs
docker compose logs -f api
```

### Option 2: Kubernetes (Scalable, Production)

Best for: Production, high availability, auto-scaling

```bash
# 1. Build and push images
./scripts/build-and-push.sh

# 2. Create namespace
kubectl create namespace qmetier

# 3. Create secrets
kubectl create secret generic qmetier-secrets \
  --from-env-file=.env \
  --namespace=qmetier

# 4. Deploy with Helm
helm upgrade --install qmetier ./infra/k8s/helm/qmetier \
  --namespace=qmetier \
  --values=./infra/k8s/helm/qmetier/values.prod.yaml

# 5. Check status
kubectl get pods -n qmetier
kubectl get services -n qmetier

# 6. View logs
kubectl logs -f deployment/qmetier-api -n qmetier
```

## SSL/TLS Setup

### Using Let's Encrypt (Free)

```bash
# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Create ClusterIssuer
kubectl apply -f infra/k8s/cert-issuer.yaml

# Certificates will be auto-generated
```

### Using Custom Certificate

```bash
# Create TLS secret
kubectl create secret tls qmetier-tls \
  --cert=path/to/cert.pem \
  --key=path/to/key.pem \
  --namespace=qmetier
```

## Database Setup

### Initial Migration

```bash
# Run migrations
docker compose exec api alembic upgrade head

# Or in Kubernetes
kubectl exec -it deployment/qmetier-api -n qmetier -- alembic upgrade head
```

### Backup Strategy

```bash
# Daily backups
kubectl create cronjob postgres-backup \
  --image=postgres:15 \
  --schedule="0 2 * * *" \
  -- pg_dump -h postgres -U postgres qmetier > /backups/qmetier-$(date +%Y%m%d).sql
```

## Monitoring Setup

### Prometheus

```bash
# Install Prometheus
helm install prometheus prometheus-community/prometheus \
  --namespace=monitoring \
  --create-namespace

# Access dashboard
kubectl port-forward -n monitoring svc/prometheus-server 9090:80
```

### Grafana

```bash
# Install Grafana
helm install grafana grafana/grafana \
  --namespace=monitoring

# Get admin password
kubectl get secret --namespace monitoring grafana -o jsonpath="{.data.admin-password}" | base64 --decode

# Access dashboard
kubectl port-forward -n monitoring svc/grafana 3000:80
```

## CI/CD Setup

### GitHub Actions

1. Add secrets to GitHub repository:
   - `DOCKER_USERNAME`
   - `DOCKER_PASSWORD`
   - `KUBECONFIG` (base64 encoded)
   - `STRIPE_SECRET_KEY`
   - `TELEGRAM_BOT_TOKEN`

2. Push to main branch triggers deployment

3. Create issues with "feature" label for AI-autonomous development

### GitLab CI (Alternative)

See `.gitlab-ci.yml` for configuration

## Scaling

### Horizontal Pod Autoscaling

```bash
# Enable autoscaling
kubectl autoscale deployment qmetier-api \
  --cpu-percent=70 \
  --min=2 \
  --max=10 \
  --namespace=qmetier
```

### Database Scaling

```bash
# Use managed PostgreSQL (recommended)
# - AWS RDS
# - Google Cloud SQL
# - Azure Database for PostgreSQL
# - DigitalOcean Managed Databases
```

## Security Checklist

- [ ] Change all default passwords
- [ ] Enable HTTPS/TLS
- [ ] Configure firewall rules
- [ ] Set up rate limiting
- [ ] Enable CORS properly
- [ ] Rotate secrets regularly
- [ ] Enable audit logging
- [ ] Set up intrusion detection
- [ ] Configure backup encryption
- [ ] Enable 2FA for admin accounts

## Performance Optimization

### CDN Setup

```bash
# Use CloudFlare, AWS CloudFront, or similar
# Configure for static assets
# Enable caching headers
```

### Database Optimization

```sql
-- Create indexes
CREATE INDEX idx_professionals_location ON professionals USING GIST (location);
CREATE INDEX idx_projects_status ON projects (status);
CREATE INDEX idx_quotes_professional ON quotes (professional_id);

-- Enable query optimization
ANALYZE;
```

### Redis Caching

```python
# Cache frequently accessed data
# - Professional profiles
# - Project listings
# - Category data
# - Translation strings
```

## Troubleshooting

### Services Won't Start

```bash
# Check logs
docker compose logs api
kubectl logs deployment/qmetier-api -n qmetier

# Check resources
kubectl top pods -n qmetier

# Check events
kubectl get events -n qmetier
```

### Database Connection Issues

```bash
# Test connection
docker compose exec api python -c "from app.database import engine; print(engine.connect())"

# Check PostgreSQL logs
docker compose logs postgres
```

### High CPU/Memory Usage

```bash
# Check metrics
kubectl top pods -n qmetier

# Scale up
kubectl scale deployment qmetier-api --replicas=5 -n qmetier

# Or let autoscaler handle it
```

## Maintenance

### Regular Tasks

- Daily: Check logs for errors
- Weekly: Review metrics and performance
- Monthly: Update dependencies
- Quarterly: Security audit
- Yearly: Disaster recovery drill

### Updates

```bash
# Update images
docker compose pull
docker compose up -d

# Or with Helm
helm upgrade qmetier ./infra/k8s/helm/qmetier
```

## Disaster Recovery

### Backup

```bash
# Database backup
pg_dump -h localhost -U postgres qmetier > backup.sql

# File backup
tar -czf qmetier-files-$(date +%Y%m%d).tar.gz /var/lib/qmetier
```

### Restore

```bash
# Restore database
psql -h localhost -U postgres qmetier < backup.sql

# Restore files
tar -xzf qmetier-files-20240228.tar.gz -C /
```

## Support

- Documentation: https://docs.qmetier.ca
- Status Page: https://status.qmetier.ca
- Support Email: support@qmetier.ca
- Emergency: +1-XXX-XXX-XXXX

---

**Remember**: Test everything in staging before deploying to production!
