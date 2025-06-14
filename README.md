<!-- markdownlint-disable MD030 -->

<div align="center">
  <img src="assets/logo_white.svg" alt="Expy AI Logo" width="200" height="80" />
  
  **Expy AI = Advanced AI Platform for LLM Configuration & Workflow Automation**
  
  [![Node CI](https://github.com/8Luay/expyai/actions/workflows/main.yml/badge.svg)](https://github.com/8Luay/expyai/actions/workflows/main.yml)
  [![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
  
</div>

---

## 🚀 Overview

Expy AI is an advanced AI platform that enables you to configure and deploy Large Language Models (LLMs) with powerful tools and automated workflows. Build, customize, and automate your AI agents effortlessly with our intuitive visual interface and comprehensive toolkit.

### ✨ Key Features

🎯 **Customizable LLM Configuration** - Choose from multiple AI providers and models  
🛠️ **Extensive Tool Integration** - Equip your agents with powerful tools to interact with various services  
⚡ **Workflow Automation** - Create complex automation workflows with a visual builder  
📚 **Built-in RAG Capabilities** - Upload and query data easily with built-in Retrieval Augmented Generation  
🔧 **Custom Tool Development** - Build your own apps, actions, and triggers using our toolkit  
🤖 **Autonomous AI Agents** - Configure triggers for fully autonomous AI operation

---

## 🏗️ Architecture

### Frontend Stack
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful and accessible component library  
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide Icons](https://lucide.dev/)** - Beautiful & consistent icon library
- **[Vite](https://vitejs.dev/)** - Fast build tool and development server
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development

### Backend Stack
- **[Express.js](https://expressjs.com/)** - Fast, unopinionated web framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe server development
- **[TypeORM](https://typeorm.io/)** - Database ORM with multi-database support
- **[BullMQ](https://bullmq.io/)** - Redis-based queue for background jobs
- **[JWT](https://jwt.io/)** - Secure authentication system

---

## 🛠️ Supported Integrations

### 🤖 AI Providers
- **OpenAI** (GPT-4, GPT-3.5, DALL-E)
- **Anthropic** (Claude 3.5, Claude 3)
- **Google** (Gemini Pro, PaLM)
- **Azure OpenAI**
- **AWS Bedrock**
- **Cohere**
- **Hugging Face**
- **Local Models** (Ollama, LM Studio)

### 🔧 Tools & Services
- **Web Browsing** - Real-time web search and scraping
- **Document Processing** - PDF, DOCX, TXT, and more
- **Database Integration** - SQL, NoSQL, Vector databases
- **API Integrations** - REST, GraphQL, webhook support
- **File Operations** - Read, write, and manipulate files
- **Email & Notifications** - SMTP, webhooks, push notifications
- **Code Execution** - Python, JavaScript sandboxed execution

### 📊 Vector Stores
- **Pinecone** - Managed vector database
- **Chroma** - Open-source embedding database
- **Qdrant** - Vector similarity search engine
- **Weaviate** - Open-source vector database
- **FAISS** - Facebook's similarity search library
- **In-Memory** - Local vector storage

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and **pnpm** 8+
- **Docker** (optional, for containerized deployment)
- **Redis** (for queue management)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/8Luay/expyai.git
   cd expyai
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Build the project**
   ```bash
   pnpm build
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build custom image
docker build -t expyai .
docker run -p 3000:3000 expyai
```

---

## 📖 Documentation

### Getting Started
- [Installation Guide](docs/installation.md)
- [Configuration](docs/configuration.md)
- [First Workflow](docs/getting-started.md)

### Features
- [LLM Configuration](docs/llm-setup.md)
- [Tool Integration](docs/tools.md)
- [Workflow Builder](docs/workflows.md)
- [RAG Implementation](docs/rag.md)
- [Custom Development](docs/custom-tools.md)

### API Reference
- [REST API](docs/api/rest.md)
- [WebSocket Events](docs/api/websocket.md)
- [Webhook Configuration](docs/api/webhooks.md)

---

## 🎨 Screenshots

<details>
<summary>Click to view screenshots</summary>

### Dashboard
![Dashboard](assets/screenshots/dashboard.png)

### Workflow Builder
![Workflow Builder](assets/screenshots/workflow-builder.png)

### LLM Configuration
![LLM Configuration](assets/screenshots/llm-config.png)

### Tool Management
![Tool Management](assets/screenshots/tools.png)

</details>

---

## 🧰 Development

### Project Structure
```
expyai/
├── packages/
│   ├── ui-next/          # Next.js 15 frontend
│   ├── server/           # Express.js backend
│   └── components/       # Shared component library
├── docker/               # Container configurations
├── docs/                 # Documentation
└── assets/               # Static assets
```

### Development Commands
```bash
# Install dependencies
pnpm install

# Development mode (all packages)
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint and format
pnpm lint
pnpm format

# Clean build artifacts
pnpm clean
```

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🔧 Configuration

### Environment Variables

**Core Settings**
```env
# Database
DATABASE_TYPE=sqlite
DATABASE_PATH=./database.sqlite

# Authentication
JWT_SECRET=your-jwt-secret

# AI Providers
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
```

**Advanced Configuration**
```env
# Redis (for queues)
REDIS_URL=redis://localhost:6379

# File Storage
STORAGE_TYPE=local
BLOB_STORAGE_PATH=./storage

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password
```

---

## 🐳 Deployment

### Production Deployment
```bash
# Build production assets
pnpm build

# Start production server
pnpm start
```

### Docker Deployment
```yaml
# docker-compose.yml
version: '3.8'
services:
  expyai:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_TYPE=postgres
      - DATABASE_URL=postgresql://user:pass@db:5432/expyai
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: expyai
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password

  redis:
    image: redis:7-alpine
```

### Cloud Deployment
- **Vercel** - Automatic deployments from GitHub
- **Railway** - One-click deployment with database
- **DigitalOcean App Platform** - Managed deployment
- **AWS/GCP/Azure** - Full infrastructure control

---

## 🤝 Community & Support

### Community
- [GitHub Discussions](https://github.com/8Luay/expyai/discussions) - Community forum
- [Discord Server](https://discord.gg/expyai) - Real-time chat
- [Twitter](https://twitter.com/expyai) - Updates and announcements

### Support
- [Documentation](https://docs.expyai.com) - Comprehensive guides
- [GitHub Issues](https://github.com/8Luay/expyai/issues) - Bug reports and feature requests
- [Email Support](mailto:support@expyai.com) - Direct assistance

---

## 📄 License

This project is licensed under the **Expy AI License** - see the [LICENSE](LICENSE) file for details.

### Open Source
Expy AI is proudly open source. Contributions, issues, and feature requests are welcome!

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [shadcn](https://github.com/shadcn) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first approach
- [LangChain](https://langchain.com/) for AI workflow primitives
- All our [contributors](https://github.com/8Luay/expyai/graphs/contributors) 🎉

---

<div align="center">
  
  **[🌟 Star this repository](https://github.com/8Luay/expyai) if you find it helpful!**
  
  Made with ❤️ by the Expy AI team
  
</div>
