# Q-MÉTIER Quick Start Guide

Get the entire AI-autonomous marketplace running in 5 minutes!

## Prerequisites

- Docker & Docker Compose
- Python 3.11+
- Node.js 20+
- Telegram account (for bot integration)

## 🚀 Quick Start

### 1. Clone and Setup

```bash
git clone https://github.com/your-org/qmetier.git
cd qmetier
cp .env.example .env
```

### 2. Configure Environment

Edit `.env` and add:
```bash
# Required
POSTGRES_PASSWORD=your_secure_password
STRIPE_SECRET_KEY=sk_test_your_key
TELEGRAM_BOT_TOKEN=your_bot_token

# Optional (defaults work for local dev)
DATABASE_URL=postgresql://postgres:secret@localhost:5432/qmetier
OLLAMA_URL=http://localhost:11434/api/generate
```

### 3. Start Services

```bash
cd infra
docker compose up -d
```

This starts:
- PostgreSQL with pgvector
- Redis
- Ollama (LLM service)
- API (FastAPI)
- UI (Next.js)
- Matcher (Embedding service)
- Telegram Bot

### 4. Verify Services

```bash
# Check all services are running
docker compose ps

# Test API
curl http://localhost:8000/health

# Test Matcher
curl http://localhost:8001/health

# Open UI
open http://localhost:3000
```

### 5. Setup Telegram Bot

See [docs/TELEGRAM_SETUP.md](docs/TELEGRAM_SETUP.md) for detailed instructions.

Quick version:
1. Message @BotFather on Telegram
2. Create bot with `/newbot`
3. Copy token to `.env`
4. Restart telegram-bot service

## 📱 Using the Platform

### As a Customer (Web)

1. Visit http://localhost:3000
2. Click "Post a Project"
3. Fill in project details
4. View matched professionals
5. Review quotes and hire

### As a Professional (Telegram)

1. Find your bot on Telegram
2. Send `/start`
3. Register with `/register`
4. Receive job notifications
5. Submit quotes via chat
6. Purchase credits with `/credits`

## 🤖 AI-Autonomous Development

### Create a Feature

```bash
# Create feature request
cat > features/my-feature.md <<EOF
# Feature Name

Description of what this feature does.

## Requirements
- Requirement 1
- Requirement 2

## API Endpoints
- POST /endpoint - Description

## Tests
- Test scenario 1
EOF
```

### Let AI Build It

**Development (with Kiro):**
- The Kiro hook automatically triggers
- I'll implement the feature with your guidance

**Production (with Ollama):**
```bash
# Start the AI agent
python scripts/ai_agent.py

# Drop feature file in features/
# Agent automatically:
# 1. Generates code
# 2. Runs tests
# 3. Builds Docker images
# 4. Deploys to Kubernetes
```

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test

# Integration tests
docker compose -f docker-compose.test.yml up
```

## 📊 Monitoring

- API Docs: http://localhost:8000/docs
- Prometheus: http://localhost:9090 (if enabled)
- Logs: `docker compose logs -f [service]`

## 🔧 Development Workflow

### Backend Development

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Database Migrations

```bash
# Create migration
alembic revision --autogenerate -m "description"

# Apply migration
alembic upgrade head
```

## 🐛 Troubleshooting

### Services won't start
```bash
docker compose down -v
docker compose up -d
```

### Database connection errors
```bash
# Check PostgreSQL is running
docker compose ps postgres

# View logs
docker compose logs postgres
```

### Telegram bot not responding
```bash
# Check bot token
echo $TELEGRAM_BOT_TOKEN

# Restart bot
docker compose restart telegram-bot

# View logs
docker compose logs telegram-bot
```

### Ollama models not found
```bash
# Pull models manually
docker compose exec ollama ollama pull mixtral
docker compose exec ollama ollama pull nomic-embed-text
```

## 📚 Next Steps

- [Telegram Setup Guide](docs/TELEGRAM_SETUP.md)
- [Design Document](.kiro/specs/qmetier-ai-autonomous-platform/design.md)
- [API Documentation](http://localhost:8000/docs)
- [Feature Examples](features/README.md)

## 🆘 Getting Help

- Check logs: `docker compose logs [service]`
- View API errors: http://localhost:8000/docs
- Test endpoints with Swagger UI
- Review feature examples in `features/`

---

**You're ready to build!** 🚀

The platform is now running and ready for autonomous development. Create feature files and watch the AI build your marketplace!
