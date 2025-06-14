# Flowise AI - Developer Guide

## 🏗️ Technical Architecture Deep Dive

### Core Technology Stack

#### **Backend (Node.js + TypeScript)**
- **Framework**: Express.js with TypeScript
- **CLI**: oclif framework for command-line interface
- **Database ORM**: TypeORM with support for PostgreSQL, MySQL, SQLite
- **Authentication**: JWT + Passport.js with multi-provider support
- **Queue System**: BullMQ with Redis backend
- **Validation**: Zod for schema validation
- **File Processing**: Multer with S3/GCS integration
- **Real-time**: Server-Sent Events (SSE) + WebSocket support
- **Monitoring**: OpenTelemetry, Prometheus metrics
- **Email**: Nodemailer with SMTP support

#### **Frontend (React + TypeScript)**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **UI Library**: Material-UI (MUI) v5.15.0
- **State Management**: Redux Toolkit + React Context
- **Flow Editor**: ReactFlow for visual workflow canvas
- **Code Editor**: CodeMirror 6 with syntax highlighting
- **Forms**: Formik + Yup validation
- **Routing**: React Router v6
- **Charts**: Recharts for data visualization
- **Rich Text**: TipTap editor for content editing

#### **Components System (Shared Library)**
- **Architecture**: Modular node-based system
- **Categories**: 20+ categories with 300+ built-in nodes
- **Runtime**: Dynamic loading and execution
- **Validation**: Type-safe interfaces with TypeScript
- **Integration**: LangChain.js ecosystem

## 🏭 Project Structure Analysis

```
expyai/
├── packages/
│   ├── server/                    # Backend API Server
│   │   ├── src/
│   │   │   ├── commands/          # CLI commands (start, worker)
│   │   │   ├── controllers/       # Express route controllers
│   │   │   ├── database/          # TypeORM entities & migrations
│   │   │   ├── enterprise/        # Enterprise-only features
│   │   │   │   ├── controllers/   # Enterprise API endpoints
│   │   │   │   ├── database/      # Enterprise entities
│   │   │   │   ├── middleware/    # Auth & permission middleware
│   │   │   │   ├── rbac/          # Role-based access control
│   │   │   │   ├── routes/        # Enterprise routes
│   │   │   │   ├── services/      # Business logic
│   │   │   │   └── sso/           # SSO providers (Auth0, Azure, etc.)
│   │   │   ├── middlewares/       # Express middleware
│   │   │   ├── queue/             # Background job processing
│   │   │   ├── routes/            # API route definitions
│   │   │   ├── services/          # Core business logic
│   │   │   └── utils/             # Utility functions
│   │   ├── bin/                   # Executable scripts
│   │   ├── logs/                  # Application logs
│   │   └── marketplaces/          # Pre-built templates
│   │
│   ├── ui/                        # React Frontend
│   │   ├── src/
│   │   │   ├── api/               # API client functions
│   │   │   ├── assets/            # Static assets
│   │   │   ├── hooks/             # Custom React hooks
│   │   │   ├── layout/            # Layout components
│   │   │   ├── menu-items/        # Navigation structure
│   │   │   ├── routes/            # Route definitions
│   │   │   ├── store/             # Redux store & slices
│   │   │   ├── themes/            # MUI theme configuration
│   │   │   ├── ui-component/      # Reusable UI components
│   │   │   ├── utils/             # Frontend utilities
│   │   │   └── views/             # Page components
│   │   └── public/                # Public static files
│   │
│   ├── components/                # Shared Component Library
│   │   ├── credentials/           # Authentication providers
│   │   ├── nodes/                 # Flow components by category
│   │   │   ├── agents/            # AI agent nodes
│   │   │   ├── chatmodels/        # LLM integrations
│   │   │   ├── documentloaders/   # Data source connectors
│   │   │   ├── embeddings/        # Vector embedding models
│   │   │   ├── llms/              # Language models
│   │   │   ├── memory/            # Conversation memory
│   │   │   ├── tools/             # Utility tools
│   │   │   ├── vectorstores/      # Vector databases
│   │   │   └── ... (17+ more categories)
│   │   └── src/                   # Component interfaces & utils
│   │
│   └── api-documentation/         # Auto-generated API docs
│       └── src/                   # Swagger/OpenAPI specs
│
├── docker/                        # Container configurations
│   ├── worker/                    # Background worker setup
│   └── Dockerfile                 # Main application container
│
├── metrics/                       # Observability stack
│   ├── grafana/                   # Dashboards & visualization
│   ├── otel/                      # OpenTelemetry configuration
│   └── prometheus/                # Metrics collection
│
├── .github/                       # CI/CD workflows
│   └── workflows/                 # GitHub Actions
│
└── assets/                        # Documentation assets
```

## 🔧 Environment Variables Reference

### Core Configuration

#### **Server Settings**
```env
# Basic Server Configuration
PORT=3000                          # Server port (default: 3000)
HOST=localhost                     # Server host (default: localhost)
CORS_ORIGINS=*                     # CORS allowed origins
IFRAME_ORIGINS=*                   # IFrame allowed origins
NUMBER_OF_PROXIES=0                # Number of reverse proxies
FLOWISE_FILE_SIZE_LIMIT=50mb       # File upload size limit

# Debug & Development
DEBUG=false                        # Enable debug logging
LOG_LEVEL=info                     # Logging level (error, warn, info, debug)
LOG_PATH=./logs                    # Log file directory
DISABLE_FLOWISE_TELEMETRY=false    # Disable telemetry data
```

#### **Database Configuration**
```env
# Database Type & Connection
DATABASE_TYPE=sqlite               # sqlite | postgres | mysql
DATABASE_PATH=./database.sqlite    # SQLite file path
DATABASE_HOST=localhost            # Database server host
DATABASE_PORT=5432                 # Database server port
DATABASE_NAME=flowise              # Database name
DATABASE_USER=postgres             # Database username
DATABASE_PASSWORD=password         # Database password

# SSL Configuration
DATABASE_SSL=false                 # Enable SSL connection
DATABASE_SSL_KEY_BASE64=           # Base64 encoded SSL certificate
```

#### **Authentication & Security**
```env
# Basic Authentication (Open Source)
FLOWISE_USERNAME=admin             # Basic auth username
FLOWISE_PASSWORD=admin             # Basic auth password

# JWT Configuration (Enterprise)
JWT_AUTH_TOKEN_SECRET=secret       # JWT signing secret
JWT_REFRESH_TOKEN_SECRET=refresh   # Refresh token secret
JWT_ISSUER=flowise                 # JWT issuer
JWT_AUDIENCE=flowise               # JWT audience
JWT_TOKEN_EXPIRY_IN_MINUTES=60     # Access token expiry
JWT_REFRESH_TOKEN_EXPIRY_IN_MINUTES=10080  # Refresh token expiry (7 days)
EXPIRE_AUTH_TOKENS_ON_RESTART=false        # Expire tokens on restart

# Session Management
EXPRESS_SESSION_SECRET=session     # Express session secret
PASSWORD_RESET_TOKEN_EXPIRY_IN_MINS=30     # Password reset expiry
PASSWORD_SALT_HASH_ROUNDS=12       # Bcrypt salt rounds
TOKEN_HASH_SECRET=token            # Token hashing secret
```

### Storage & File Management

#### **Local/Basic Storage**
```env
STORAGE_TYPE=local                 # local | s3 | gcs | azure
BLOB_STORAGE_PATH=./storage        # Local storage directory
```

#### **AWS S3 Storage**
```env
STORAGE_TYPE=s3
S3_STORAGE_BUCKET_NAME=my-bucket   # S3 bucket name
S3_STORAGE_ACCESS_KEY_ID=key       # AWS access key
S3_STORAGE_SECRET_ACCESS_KEY=secret # AWS secret key
S3_STORAGE_REGION=us-east-1        # AWS region
S3_ENDPOINT_URL=                   # Custom S3 endpoint (MinIO, etc.)
S3_FORCE_PATH_STYLE=false          # Force path-style URLs
```

#### **Google Cloud Storage**
```env
STORAGE_TYPE=gcs
GOOGLE_CLOUD_STORAGE_CREDENTIAL=   # GCS service account JSON
GOOGLE_CLOUD_STORAGE_PROJ_ID=      # GCP project ID
GOOGLE_CLOUD_STORAGE_BUCKET_NAME=  # GCS bucket name
GOOGLE_CLOUD_UNIFORM_BUCKET_ACCESS=false # Uniform bucket access
```

### Secret Management

#### **Local Secrets**
```env
SECRETKEY_STORAGE_TYPE=local       # local | aws
SECRETKEY_PATH=./secrets           # Local secrets directory
FLOWISE_SECRETKEY_OVERWRITE=false  # Overwrite existing secrets
```

#### **AWS Secrets Manager**
```env
SECRETKEY_STORAGE_TYPE=aws
SECRETKEY_AWS_ACCESS_KEY=          # AWS access key for secrets
SECRETKEY_AWS_SECRET_KEY=          # AWS secret key for secrets
SECRETKEY_AWS_REGION=us-east-1     # AWS region for secrets manager
SECRETKEY_AWS_NAME=flowise-secrets # Secret name prefix
```

### Queue & Background Processing

#### **Redis Configuration**
```env
# Redis Connection (Option 1: URL)
REDIS_URL=redis://localhost:6379

# Redis Connection (Option 2: Individual settings)
REDIS_HOST=localhost               # Redis server host
REDIS_PORT=6379                    # Redis server port
REDIS_USERNAME=                    # Redis username (v6+)
REDIS_PASSWORD=                    # Redis password
REDIS_TLS=false                    # Enable TLS connection
REDIS_CERT=                        # Base64 encoded client certificate
REDIS_KEY=                         # Base64 encoded client key
REDIS_CA=                          # Base64 encoded CA certificate
REDIS_KEEP_ALIVE=30000             # Keep-alive interval (ms)

# Queue Configuration
MODE=queue                         # server | queue | both
WORKER_CONCURRENCY=5               # Number of concurrent workers
QUEUE_NAME=flowise                 # Queue name
QUEUE_REDIS_EVENT_STREAM_MAX_LEN=1000 # Max event stream length
REMOVE_ON_AGE=604800               # Remove jobs older than (seconds)
REMOVE_ON_COUNT=1000               # Keep only N recent jobs
ENABLE_BULLMQ_DASHBOARD=false      # Enable BullMQ dashboard
```

### Enterprise Features

#### **Licensing**
```env
LICENSE_URL=https://license.flowiseai.com # License server URL
FLOWISE_EE_LICENSE_KEY=            # Enterprise license key
OFFLINE=false                      # Offline license validation
```

#### **Email Configuration**
```env
SMTP_HOST=smtp.gmail.com           # SMTP server host
SMTP_PORT=587                      # SMTP server port
SMTP_USER=your-email@gmail.com     # SMTP username
SMTP_PASSWORD=your-password        # SMTP password
SMTP_SECURE=false                  # Use TLS (true for port 465)
ALLOW_UNAUTHORIZED_CERTS=false     # Allow self-signed certificates
SENDER_EMAIL=noreply@company.com   # From email address
```

#### **SSO Providers**
```env
# Auth0
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret

# Azure AD
AZURE_AD_TENANT_ID=your-tenant-id
AZURE_AD_CLIENT_ID=your-client-id
AZURE_AD_CLIENT_SECRET=your-client-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
```

### Cloud Features

#### **Stripe Integration**
```env
# Stripe Product IDs
CLOUD_FREE_ID=prod_free_plan       # Free tier product ID
CLOUD_STARTER_ID=prod_starter_plan # Starter tier product ID
CLOUD_PRO_ID=prod_pro_plan         # Pro tier product ID
ADDITIONAL_SEAT_ID=prod_seat       # Additional seat product ID

# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_...      # Stripe secret key
STRIPE_WEBHOOK_SECRET=whsec_...    # Webhook endpoint secret
```

### Monitoring & Observability

#### **LangChain Tracing**
```env
LANGCHAIN_TRACING_V2=true          # Enable LangSmith tracing
LANGCHAIN_ENDPOINT=https://api.smith.langchain.com # LangSmith endpoint
LANGCHAIN_API_KEY=your-api-key     # LangSmith API key
LANGCHAIN_PROJECT=your-project     # LangSmith project name
```

#### **OpenTelemetry**
```env
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 # OTEL collector endpoint
OTEL_SERVICE_NAME=flowise          # Service name for tracing
OTEL_RESOURCE_ATTRIBUTES=service.version=3.0.1 # Additional attributes
```

### Custom Configuration

#### **Node Management**
```env
SHOW_COMMUNITY_NODES=true          # Show community-contributed nodes
DISABLED_NODES=                    # Comma-separated list of disabled nodes
MODEL_LIST_CONFIG_JSON=            # JSON config for model lists
```

#### **Tool Dependencies**
```env
TOOL_FUNCTION_BUILTIN_DEP=         # Built-in tool dependencies
TOOL_FUNCTION_EXTERNAL_DEP=        # External tool dependencies
```

## 🛠️ Development Commands

### Package Management
```bash
# Install dependencies
pnpm install

# Clean build artifacts
pnpm clean

# Nuclear clean (removes node_modules)
pnpm nuke

# Update dependencies
pnpm update
```

### Build & Development
```bash
# Build all packages
pnpm build

# Force rebuild (ignores cache)
pnpm build-force

# Development mode (hot reload)
pnpm dev

# Production server
pnpm start

# Start background worker
pnpm start-worker
```

### Testing & Quality
```bash
# Run tests
pnpm test

# Lint code
pnpm lint

# Fix linting issues
pnpm lint-fix

# Format code
pnpm format

# Pre-commit hooks (staged files)
pnpm quick
```

### Database Management
```bash
# Generate migration
pnpm migration:create

# Run migrations
cd packages/server && pnpm typeorm:migration-run

# Revert migration
cd packages/server && pnpm typeorm:migration-revert
```

## 🚀 Migration Guide: Current Stack → shadcn/ui + Next.js 15 + Tailwind CSS

### Current State Analysis

**Current Frontend Stack:**
- React 18 + TypeScript
- Vite (build tool)
- Material-UI v5.15.0
- Redux Toolkit + React Context
- React Router v6
- ReactFlow (visual editor)
- CodeMirror 6
- Formik + Yup

**Challenges with Current Setup:**
1. **Bundle Size**: MUI adds significant bundle weight
2. **Customization**: Limited theme customization with MUI
3. **Performance**: Heavy initial load due to component library
4. **Modern Patterns**: Missing latest React patterns (Server Components)
5. **Developer Experience**: Complex MUI theme system

### Proposed Migration Strategy

#### **Phase 1: Foundation Setup (2-3 weeks)**

##### **1.1 Create New Next.js 15 Package**
```bash
# Create new package
cd packages/
npx create-next-app@latest ui-next --typescript --tailwind --eslint --app --import-alias "@/*"
```

##### **1.2 Package Structure**
```
packages/
├── ui/                    # Current React + Vite (keep for now)
└── ui-next/               # New Next.js 15 + shadcn/ui
    ├── app/               # App Router structure
    │   ├── (auth)/        # Auth group routes
    │   ├── (dashboard)/   # Dashboard group routes
    │   ├── api/           # API routes (proxy to backend)
    │   ├── globals.css    # Global styles
    │   └── layout.tsx     # Root layout
    ├── components/        # shadcn/ui components
    │   ├── ui/            # Base UI components
    │   ├── forms/         # Form components
    │   ├── charts/        # Chart components
    │   └── flow/          # Flow editor components
    ├── lib/               # Utilities
    ├── hooks/             # Custom hooks
    └── types/             # Type definitions
```

##### **1.3 Setup shadcn/ui**
```bash
cd packages/ui-next
npx shadcn@latest init

# Install core components
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add table
npx shadcn@latest add tabs
npx shadcn@latest add navigation-menu
```

##### **1.4 Next.js Configuration**
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL || 'http://localhost:3000'}/api/:path*`,
      },
    ]
  },
  webpack: (config) => {
    // Handle ReactFlow and other complex dependencies
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }
    return config
  },
}

module.exports = nextConfig
```

##### **1.5 Tailwind Configuration**
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Flowise brand colors
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        // Custom flow colors
        flow: {
          bg: '#fafafa',
          node: '#ffffff',
          connection: '#94a3b8',
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

#### **Phase 2: Core Components Migration (3-4 weeks)**

##### **2.1 Layout System**
```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/navbar/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

##### **2.2 Navigation Component**
```typescript
// components/navigation/sidebar.tsx
"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: 'Flows',
      icon: 'workflow',
      href: '/flows',
      color: "text-sky-500",
    },
    {
      label: 'Assistants',
      icon: 'bot',
      href: '/assistants',
      color: "text-violet-500",
    },
    // ... more routes
  ]

  return (
    <div className={cn("pb-12", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Flowise
          </h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={route.href}>
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

##### **2.3 Flow Editor Component**
```typescript
// components/flow/flow-editor.tsx
"use client"

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
} from 'reactflow'
import 'reactflow/dist/style.css'

import { CustomNode } from './custom-node'
import { NodePanel } from './node-panel'

const nodeTypes = {
  custom: CustomNode,
}

export function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = (params: Connection | Edge) => {
    setEdges((eds) => addEdge(params, eds))
  }

  return (
    <div className="h-screen w-full">
      <div className="flex h-full">
        <NodePanel />
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            className="bg-gray-50"
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </div>
    </div>
  )
}
```

#### **Phase 3: Advanced Features (4-5 weeks)**

##### **3.1 State Management Migration**
```typescript
// lib/store.ts (Zustand instead of Redux)
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface FlowState {
  flows: Flow[]
  currentFlow: Flow | null
  isLoading: boolean
  setFlows: (flows: Flow[]) => void
  setCurrentFlow: (flow: Flow | null) => void
  setLoading: (loading: boolean) => void
}

export const useFlowStore = create<FlowState>()(
  devtools(
    persist(
      (set) => ({
        flows: [],
        currentFlow: null,
        isLoading: false,
        setFlows: (flows) => set({ flows }),
        setCurrentFlow: (currentFlow) => set({ currentFlow }),
        setLoading: (isLoading) => set({ isLoading }),
      }),
      {
        name: 'flow-storage',
      }
    )
  )
)
```

##### **3.2 Form System Migration**
```typescript
// components/forms/flow-form.tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const flowFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
})

type FlowFormValues = z.infer<typeof flowFormSchema>

export function FlowForm() {
  const form = useForm<FlowFormValues>({
    resolver: zodResolver(flowFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const onSubmit = (data: FlowFormValues) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flow Name</FormLabel>
              <FormControl>
                <Input placeholder="My AI Flow" {...field} />
              </FormControl>
              <FormDescription>
                This is your flow's display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Flow</Button>
      </form>
    </Form>
  )
}
```

#### **Phase 4: Performance Optimization (2-3 weeks)**

##### **4.1 Server Components**
```typescript
// app/flows/page.tsx (Server Component)
import { FlowList } from '@/components/flow/flow-list'
import { getFlows } from '@/lib/api/flows'

export default async function FlowsPage() {
  const flows = await getFlows()

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Flows</h1>
      </div>
      <FlowList flows={flows} />
    </div>
  )
}
```

##### **4.2 Streaming & Suspense**
```typescript
// app/flows/[id]/page.tsx
import { Suspense } from 'react'
import { FlowEditor } from '@/components/flow/flow-editor'
import { FlowSkeleton } from '@/components/flow/flow-skeleton'

export default function FlowPage({ params }: { params: { id: string } }) {
  return (
    <div className="h-screen">
      <Suspense fallback={<FlowSkeleton />}>
        <FlowEditor flowId={params.id} />
      </Suspense>
    </div>
  )
}
```

#### **Phase 5: Migration Execution (2-3 weeks)**

##### **5.1 Gradual Rollout Strategy**
1. **Feature Flag System**: Implement feature flags to toggle between old/new UI
2. **Route-by-Route Migration**: Migrate individual pages gradually
3. **API Compatibility**: Ensure both UIs can use the same backend APIs
4. **User Testing**: Beta test with select users

##### **5.2 Performance Monitoring**
```typescript
// lib/analytics.ts
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
      <SpeedInsights />
    </>
  )
}
```

### Migration Benefits

#### **Performance Improvements**
- **Bundle Size**: ~60% reduction (shadcn/ui vs MUI)
- **Initial Load**: ~40% faster with Next.js optimizations
- **Runtime Performance**: Better with React Server Components
- **SEO**: Improved with Next.js App Router

#### **Developer Experience**
- **Type Safety**: Better TypeScript integration
- **Component Reusability**: More modular component system
- **Customization**: Easier theming with Tailwind
- **Build Time**: Faster builds with Turbopack

#### **Maintenance Benefits**
- **Dependencies**: Fewer dependencies to maintain
- **Updates**: Easier framework updates
- **Bundle Analysis**: Better tooling for optimization
- **Testing**: Improved testing patterns

### Migration Checklist

#### **Pre-Migration Setup**
- [ ] Set up Next.js 15 project structure
- [ ] Configure shadcn/ui components
- [ ] Set up Tailwind CSS with custom theme
- [ ] Configure TypeScript paths and aliases
- [ ] Set up state management (Zustand)

#### **Component Migration**
- [ ] Layout components (Header, Sidebar, Footer)
- [ ] Navigation system
- [ ] Form components and validation
- [ ] Data display components (Tables, Cards)
- [ ] Modal and dialog systems
- [ ] Chart and visualization components

#### **Page Migration**
- [ ] Authentication pages
- [ ] Dashboard/Home page
- [ ] Flow editor
- [ ] Settings pages
- [ ] User management (Enterprise)

#### **Advanced Features**
- [ ] Real-time updates (WebSocket/SSE)
- [ ] File upload systems
- [ ] Search functionality
- [ ] Theme switching
- [ ] Internationalization

#### **Testing & Deployment**
- [ ] Unit tests for components
- [ ] Integration tests for pages
- [ ] E2E tests for critical flows
- [ ] Performance testing
- [ ] Accessibility testing
- [ ] Cross-browser testing

### Estimated Timeline: **12-16 weeks total**

This migration strategy provides a structured approach to modernizing the Flowise frontend while maintaining stability and introducing significant performance improvements. The gradual migration approach ensures minimal disruption to users while allowing for comprehensive testing at each phase. 