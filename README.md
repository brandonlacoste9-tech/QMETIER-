# Q-MÉTIER - Plateforme Québécoise de Services Professionnels

La première plateforme québécoise de mise en relation avec des professionnels, alimentée par l'intelligence artificielle. Trouvez le bon professionnel pour votre projet en quelques minutes.

**Fait au Québec, pour le Québec** 🇫🇷🇨🇦

## 🚀 Quick Start

```bash
# 1. Install Ollama
curl -fsSL https://ollama.com/install.sh | sh
ollama serve &

# 2. Pull models
ollama pull mixtral
ollama pull nomic-embed-text

# 3. Clone and setup
git clone https://github.com/your-org/qmetier.git
cd qmetier
cp .env.example .env

# 4. Start services
cd infra
docker compose up -d

# 5. Run AI-Agent
python scripts/ai_agent.py
```

## 🏗️ Architecture

```
┌─────────────────┐
│ Feature Request │ (markdown file)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   AI-Agent      │ (Python orchestrator)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Ollama LLM     │ (code generation)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Verify & Test   │ (pytest/mypy/eslint)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Docker Build    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ K8s Deploy      │ (Helm)
└─────────────────┘
```

## 📁 Repository Structure

```
qmetier/
├── features/          # Feature request markdown files
├── backend/           # FastAPI application
├── frontend/          # Next.js application
├── scripts/           # AI-Agent and utilities
├── infra/             # Docker & Kubernetes configs
├── data/              # LoRA training data
└── logs/              # Agent execution logs
```

## 🎯 Core Features

- **AI-Powered Matching**: Semantic embeddings + pgvector for professional matching
- **Credit System**: Token-based quote submission with Stripe integration
- **Self-Healing**: Automatic infrastructure optimization via LLM
- **Autonomous Development**: Zero manual coding after initial setup

## 🛠️ Development Workflow

### Using Kiro (Development Phase)

1. Create feature file in `features/`
2. Kiro hook automatically triggers
3. Implement code with AI assistance
4. Test and iterate

### Using Ollama (Production Phase)

1. Drop feature `.md` file in `features/`
2. AI-Agent watches and processes automatically
3. Code generated, tested, deployed
4. Zero human intervention

## 📊 Tech Stack

- **Backend**: FastAPI, PostgreSQL + pgvector, Redis
- **Frontend**: Next.js, React, TypeScript
- **AI**: Ollama (Mixtral, nomic-embed-text)
- **Infrastructure**: Docker, Kubernetes, Helm
- **Monitoring**: Prometheus, Loki

## 🔧 Configuration

See `.env.example` for all configuration options.

Key environment variables:
- `OLLAMA_URL` - Ollama API endpoint
- `DATABASE_URL` - PostgreSQL connection string
- `STRIPE_SECRET_KEY` - Stripe API key
- `LLM_MODEL` - Model for code generation

## 📝 Creating Features

Create a markdown file in `features/` directory:

```markdown
# Feature Name

Description of what this feature does.

## Requirements
- Requirement 1
- Requirement 2

## API Endpoints
- POST /endpoint - Description

## Tests
- Test scenario 1
```

The AI-Agent will automatically:
1. Generate all required code
2. Write tests
3. Build Docker images
4. Deploy to Kubernetes

## 🔐 Security

- Stripe webhook signature verification
- Database transaction isolation
- Credit balance constraints
- API rate limiting

## 📈 Monitoring

- Prometheus metrics at `:9090`
- API health check at `:8000/health`
- Matcher health check at `:8001/health`

## 🤖 Self-Healing

The platform automatically detects and fixes:
- High CPU usage → Increase resource limits
- High memory usage → Scale up resources
- High error rates → Increase replicas

## 📚 Documentation

- [Design Document](.kiro/specs/qmetier-ai-autonomous-platform/design.md)
- [API Documentation](http://localhost:8000/docs)
- [Feature Examples](features/README.md)

## 🚦 Status

- ✅ Repository structure
- ✅ AI-Agent orchestrator
- ✅ Docker Compose setup
- ✅ Kiro hooks for development
- 🔄 Core features (in progress)
- ⏳ Kubernetes deployment
- ⏳ Self-healing loop

## 📄 License

See LICENSE file.

## 🤝 Contributing

This project is AI-autonomous. To contribute:
1. Create a feature request in `features/`
2. Let the AI-Agent implement it
3. Review and approve the PR

---

**Q-MÉTIER** - Where AI builds itself 🚀
