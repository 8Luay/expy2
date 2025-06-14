# Expy AI Enterprise Architecture Analysis

## Overview

Expy AI is a comprehensive AI workflow platform with enterprise features including multi-tenancy, role-based access control (RBAC), billing, and organization management. The system supports both open-source and enterprise versions with varying feature sets.

## Core Entity Relationships

### Hierarchical Structure
```
Organization
├── Users (OrganizationUser relationship)
├── Workspaces
│   ├── Users (WorkspaceUser relationship)
│   ├── Chatflows
│   ├── Tools
│   ├── Credentials
│   └── Other resources
├── Roles (Organization-scoped)
├── Billing/Subscription
└── Login Methods (SSO config)
```

## Data Model Deep Dive

### 1. User Entity
**File**: `packages/server/src/enterprise/database/entities/user.entity.ts`

```typescript
export class User {
    id: string                    // UUID
    name: string                  // Display name
    email: string                 // Unique identifier
    credential?: string           // Hashed password
    tempToken?: string           // Registration/invite token
    tokenExpiry?: Date           // Token expiration
    status: UserStatus           // ACTIVE | INVITED | UNVERIFIED | DELETED
    createdDate: Date
    updatedDate: Date
    createdBy: string            // User who created this user
    updatedBy: string            // User who last updated
}

export enum UserStatus {
    ACTIVE = 'active',
    INVITED = 'invited',
    UNVERIFIED = 'unverified',
    DELETED = 'deleted'
}
```

**Key Features:**
- Supports invitation-based user onboarding
- Tracks creator and updater for audit trail
- Temporary tokens for secure registration flow
- Status management for user lifecycle

### 2. Organization Entity
**File**: `packages/server/src/enterprise/database/entities/organization.entity.ts`

```typescript
export class Organization {
    id: string                    // UUID
    name: string                  // Organization name (default: "Default Organization")
    customerId?: string          // Stripe customer ID for billing
    subscriptionId?: string      // Stripe subscription ID
    createdDate: Date
    updatedDate: Date
    createdBy: string
    updatedBy: string
}
```

**Billing Integration:**
- Direct integration with Stripe for subscription management
- Customer ID links to Stripe customer records
- Subscription ID tracks active billing subscription

### 3. OrganizationUser Relationship
**File**: `packages/server/src/enterprise/database/entities/organization-user.entity.ts`

```typescript
export class OrganizationUser {
    organizationId: string       // Composite primary key
    userId: string              // Composite primary key
    roleId: string              // Organization-level role
    status: string              // ACTIVE | DISABLE | INVITED
    createdDate: Date
    updatedDate: Date
    createdBy: string
    updatedBy: string
}
```

**Key Concepts:**
- Many-to-many relationship between users and organizations
- Users can belong to multiple organizations
- Each membership has its own role and status
- Supports organization-level invitations

### 4. Workspace Entity
**File**: `packages/server/src/enterprise/database/entities/workspace.entity.ts`

```typescript
export class Workspace {
    id: string                    // UUID
    name: string                  // Workspace name
    description?: string          // Optional description
    organizationId: string        // Parent organization
    createdDate: Date
    updatedDate: Date
    createdBy: string
    updatedBy: string
}

export enum WorkspaceName {
    DEFAULT_WORKSPACE = 'Default Workspace',
    DEFAULT_PERSONAL_WORKSPACE = 'Personal Workspace'
}
```

**Workspace Types:**
- **Default Workspace**: Organization-wide shared workspace
- **Personal Workspace**: User's private workspace
- **Custom Workspaces**: Team-specific workspaces

### 5. WorkspaceUser Relationship
**File**: `packages/server/src/enterprise/database/entities/workspace-user.entity.ts`

```typescript
export class WorkspaceUser {
    workspaceId: string          // Composite primary key
    userId: string              // Composite primary key
    roleId: string              // Workspace-specific role
    status: string              // ACTIVE | DISABLE | INVITED
    lastLogin?: string          // Last workspace access
    createdDate: Date
    updatedDate: Date
    createdBy: string
    updatedBy: string
}
```

**Key Features:**
- Separate role management per workspace
- Tracks last login per workspace
- Supports workspace-level invitations

### 6. Role Entity & RBAC System
**File**: `packages/server/src/enterprise/database/entities/role.entity.ts`

```typescript
export class Role {
    id: string                    // UUID
    organizationId?: string       // Organization scope (null for system roles)
    name: string                  // Role name
    description?: string          // Role description
    permissions: string           // JSON array of permission keys
    createdDate: Date
    updatedDate: Date
    createdBy: string
    updatedBy: string
}

export enum GeneralRole {
    OWNER = 'owner',
    MEMBER = 'member',
    PERSONAL_WORKSPACE = 'personal workspace'
}
```

**Permission System**: `packages/server/src/enterprise/rbac/Permissions.ts`

Categories of permissions:
- **chatflows**: view, create, update, duplicate, delete, export, import, config, domains
- **agentflows**: view, create, update, duplicate, delete, export, import, config, domains
- **tools**: view, create, update, delete, export
- **assistants**: view, create, update, delete
- **credentials**: view, create, update, delete, share
- **variables**: view, create, update, delete
- **apikeys**: view, create, update, delete, import
- **documentStores**: view, create, update, delete, add-loader, delete-loader, preview-process, upsert-config
- **datasets**: view, create, update, delete
- **executions**: view, delete
- **evaluators**: view, create, update, delete
- **evaluations**: view, create, update, delete, run
- **templates**: marketplace, custom, custom-delete, toolexport, flowexport, custom-share
- **workspace**: view, create, update, add-user, unlink-user, delete, export, import
- **admin**: users:manage, roles:manage, sso:manage
- **logs**: view (enterprise only)
- **loginActivity**: view, delete (enterprise only)

### 7. Login Method Entity (SSO)
**File**: `packages/server/src/enterprise/database/entities/login-method.entity.ts`

```typescript
export class LoginMethod {
    id: string                    // UUID
    organizationId?: string       // Organization scope
    name: string                  // Provider name (Auth0, Google, Azure)
    config: string                // JSON configuration
    status: string                // ENABLE | DISABLE
    createdDate: Date
    updatedDate: Date
    createdBy: string
    updatedBy: string
}
```

**Supported SSO Providers:**
- Auth0
- Google
- Microsoft Azure
- Custom SAML/OIDC providers

## API Endpoints Analysis

### Organization Management

**Base Route**: `/organization`
**File**: `packages/server/src/enterprise/routes/organization.route.ts`

| Method | Endpoint | Purpose | Controller Method |
|--------|----------|---------|-------------------|
| GET | `/` | Get organization by ID or name | `read()` |
| POST | `/` | Create new organization | `create()` |
| PUT | `/` | Update organization | `update()` |

**Billing Endpoints:**
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/additional-seats-quantity` | Get current seat allocation |
| GET | `/customer-default-source` | Get Stripe payment method |
| GET | `/additional-seats-proration` | Calculate seat change cost |
| POST | `/update-additional-seats` | Modify seat count |
| GET | `/plan-proration` | Calculate plan change cost |
| POST | `/update-subscription-plan` | Change subscription plan |
| GET | `/get-current-usage` | Get usage metrics |

### User Management

**Base Route**: `/organizationuser`
**File**: `packages/server/src/enterprise/routes/organization-user.route.ts`

| Method | Endpoint | Purpose | Permissions Required |
|--------|----------|---------|---------------------|
| GET | `/` | List organization users | None |
| POST | `/` | Invite user to organization | `users:manage` + `feat:users` |
| PUT | `/` | Update user role/status | `users:manage` + `feat:users` |
| DELETE | `/` | Remove user from organization | `users:manage` + `feat:users` |

**Query Parameters:**
- `organizationId`: Filter by organization
- `userId`: Get specific user's membership

### Role Management

**Base Route**: `/role`
**File**: `packages/server/src/enterprise/routes/role.route.ts`

| Method | Endpoint | Purpose | Permissions Required |
|--------|----------|---------|---------------------|
| GET | `/` | List roles by organization | None |
| POST | `/` | Create new role | `roles:manage` |
| PUT | `/` | Update role | `roles:manage` |
| DELETE | `/` | Delete role | `roles:manage` |

### Workspace Management

**Base Route**: `/workspace`
**File**: `packages/server/src/enterprise/routes/workspace.route.ts`

| Method | Endpoint | Purpose | Permissions Required |
|--------|----------|---------|---------------------|
| GET | `/` | List workspaces | `workspace:view` + `feat:workspaces` |
| POST | `/` | Create workspace | `workspace:create` + `feat:workspaces` |
| POST | `/switch` | Switch active workspace | None |
| PUT | `/` | Update workspace | `workspace:update` + `feat:workspaces` |
| DELETE | `/` or `/:id` | Delete workspace | `workspace:delete` + `feat:workspaces` |
| GET | `/shared` or `/shared/:id` | Get shared workspaces | `workspace:create` + `feat:workspaces` |
| POST | `/shared` or `/shared/:id` | Set shared workspaces | `workspace:create` + `feat:workspaces` |

### Workspace User Management

**Base Route**: `/workspaceuser`
**File**: `packages/server/src/enterprise/routes/workspace-user.route.ts`

| Method | Endpoint | Purpose | Permissions Required |
|--------|----------|---------|---------------------|
| GET | `/` | List workspace users | None |
| POST | `/` | Add user to workspace | `workspace:add-user` + `feat:workspaces` |
| PUT | `/` | Update workspace user role | `workspace:add-user` + `feat:workspaces` |
| DELETE | `/` | Remove user from workspace | `workspace:unlink-user` + `feat:workspaces` |

**Query Parameters:**
- `workspaceId`: Filter by workspace
- `userId`: Get specific user's workspace membership
- `roleId`: Get users with specific role
- `organizationId`: Filter by organization

### Authentication & Permissions

**Base Route**: `/auth`
**File**: `packages/server/src/enterprise/routes/auth/index.ts`

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/permissions` | Get all available permissions |

## Frontend Architecture Analysis

### View Structure

**Frontend Views Location**: `packages/ui/src/views/`

Key enterprise views:
- **Organization**: `/organization` - Organization setup and management
- **Users**: `/users` - Organization user management
- **Roles**: `/roles` - Role and permission management
- **Workspace**: `/workspace` - Workspace management
- **Account**: `/account` - Billing and subscription management
- **Settings**: Various settings pages

### Authentication Flow

**Files**: 
- `packages/ui/src/views/auth/`
- `packages/ui/src/views/organization/index.jsx`

**User Registration Flow:**
1. **Organization Setup** (Enterprise): Create organization + admin user
2. **User Invitation**: Admin invites users via email
3. **Token-based Registration**: Users register using invite tokens
4. **SSO Authentication**: Alternative login via configured providers

**Login Flow:**
1. User provides credentials or uses SSO
2. System validates credentials
3. User context is established with:
   - Active organization ID
   - Active workspace ID
   - Available workspaces
   - User permissions
   - Subscription details

### User Management UI

**File**: `packages/ui/src/views/users/index.jsx`

**Key Features:**
- Search and filter users
- Invite new users with email
- Edit user roles and status
- View user's workspace assignments
- Remove users from organization
- Organization owner protection (cannot delete self)

**User States:**
- **ACTIVE**: Full access user
- **INVITED**: Pending registration
- **INACTIVE**: Disabled access

### Role Management UI

**File**: `packages/ui/src/views/roles/index.jsx`

**Key Features:**
- Create custom roles with specific permissions
- Edit role permissions via checkbox matrix
- View users assigned to each role
- Delete custom roles (system roles protected)
- Permission categories displayed hierarchically

### Workspace Management UI

**File**: `packages/ui/src/views/workspace/index.jsx`

**Key Features:**
- Create team workspaces
- Manage workspace users and roles
- Switch between workspaces
- Share workspaces across organization
- Workspace deletion (with protection for active/populated workspaces)

### Billing & Account Management

**File**: `packages/ui/src/views/account/index.jsx`

**Key Features:**
- View current subscription plan
- Monitor usage metrics (predictions, storage)
- Manage additional seats
- Access Stripe billing portal
- Proration calculations for plan changes
- Seat quantity management with real-time cost calculation

**Usage Tracking:**
- **Predictions**: API calls/requests
- **Storage**: File and data storage
- **Seats**: User count vs. subscription limits

## Authentication & Authorization

### Token-based Authentication
- JWT tokens for API authentication
- Refresh token mechanism for session management
- SSO integration with external providers

### Role-Based Access Control (RBAC)
- **System Roles**: Built-in roles (owner, member)
- **Custom Roles**: Organization-defined roles
- **Permission Matrix**: Granular permissions per feature
- **Feature Flags**: Plan-based feature access (`feat:users`, `feat:workspaces`)

### Permission Checking
**File**: `packages/server/src/enterprise/rbac/PermissionCheck.ts`

- Middleware-based permission validation
- User context includes active organization and permissions
- Feature access controlled by subscription plan

## Billing Integration

### Stripe Integration
- **Customer Management**: Stripe customers linked to organizations
- **Subscription Management**: Plan upgrades/downgrades
- **Seat Management**: Dynamic user seat allocation
- **Proration**: Real-time cost calculations
- **Payment Methods**: Stored payment sources

### Usage Tracking
**File**: `packages/server/src/utils/quotaUsage.ts`
- Real-time usage monitoring
- Plan-based limits enforcement
- Usage reporting and alerts

## Multi-tenancy Architecture

### Organization Isolation
- All resources scoped to organizations
- Users can belong to multiple organizations
- Organization-level billing and configuration

### Workspace Isolation
- Resources isolated within workspaces
- Granular access control per workspace
- Shared resources across organization workspaces

### Data Separation
- Database-level tenancy via organization/workspace IDs
- API-level filtering by current user context
- UI-level resource scoping

## Security Features

### Authentication Security
- Password requirements (complexity rules)
- Token expiration and rotation
- SSO provider integration
- Account lockout protection

### Authorization Security
- Permission-based API access
- Resource ownership validation
- Organization boundary enforcement
- Audit trail for all changes

### Data Security
- User credential hashing
- Secure token generation
- API rate limiting
- Input validation and sanitization

## Feature Flags & Plans

### Plan-based Features
- `feat:users`: User management capabilities
- `feat:workspaces`: Multi-workspace support
- Enterprise-only permissions (logs, login activity)

### Subscription Tiers
- **Open Source**: Basic features, single workspace
- **Professional**: Multi-workspace, team features
- **Enterprise**: Advanced security, audit logs, SSO

This enterprise architecture provides a comprehensive multi-tenant platform with robust security, flexible permission management, and integrated billing capabilities suitable for organizations of all sizes. 