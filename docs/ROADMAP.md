# Enterprise Feature Rebuild Roadmap

## 1. User Management
- **References:**
  - `/users` route in frontend (`packages/web/src/routes/index.ts`)
  - Backend: `OrganizationUserController`, `OrganizationUserService`, `UserService`
- **What to Rebuild:**
  - User CRUD (create, read, update, delete)
  - User invitation and status (active, invited, disabled)
  - User-organization and user-workspace relationships
- **Open Source Alternatives/Ideas:**
  - Use [CASL](https://casl.js.org/) or [node-casbin](https://casbin.org/) for access control
  - Use [Passport.js](http://www.passportjs.org/) for authentication

## 2. Role and Permissions Management (RBAC)
- **References:**
  - `/roles` route in frontend
  - Backend: `enterprise/rbac/Permissions.ts`, `PermissionCheck.ts`, `RoleService`
- **What to Rebuild:**
  - Role CRUD
  - Assigning permissions to roles
  - Assigning roles to users
  - Permission checks on routes
- **Open Source Alternatives/Ideas:**
  - [node-casbin](https://casbin.org/)
  - [RBAC libraries for Node.js](https://github.com/OptimalBits/node_acl)

## 3. Workspace Management
- **References:**
  - `/workspaces`, `/workspace-users/:id` routes in frontend
  - Backend: `WorkspaceService`, `WorkspaceUserService`, `Workspace` entities
- **What to Rebuild:**
  - Workspace CRUD
  - Assigning users to workspaces
  - Managing workspace roles
- **Open Source Alternatives/Ideas:**
  - Model workspaces as organizations/teams in your DB
  - Use [sequelize](https://sequelize.org/) or [typeorm](https://typeorm.io/) for ORM

## 4. Single Sign-On (SSO)
- **References:**
  - `/sso-config` route in frontend
  - Backend: `enterprise/sso/SSOBase.ts`, `AzureSSO.ts`, `GoogleSSO.ts`, `Auth0SSO.ts`, `GithubSSO.ts`, `login-method.controller.ts`
- **What to Rebuild:**
  - SSO provider integration (Azure, Google, Auth0, GitHub)
  - SSO configuration UI
  - SSO login and callback endpoints
- **Open Source Alternatives/Ideas:**
  - [Passport.js SSO strategies](http://www.passportjs.org/packages/)
  - [NextAuth.js](https://next-auth.js.org/) for Next.js

## 5. Login Activity Monitoring
- **References:**
  - `/login-activity` route in frontend
  - Backend: `LoginActivity`, `auditService`, `login-method.controller.ts`
- **What to Rebuild:**
  - Logging login attempts and activity codes
  - Viewing login history per user
- **Open Source Alternatives/Ideas:**
  - Use a logging library (e.g., [winston](https://github.com/winstonjs/winston))
  - Store logs in a DB table and expose via API

## 6. Organization Management
- **References:**
  - Backend: `OrganizationService`, `organization-user.controller.ts`, `organization.entity.ts`
- **What to Rebuild:**
  - Organization CRUD
  - Assigning users to organizations
  - Organization-level roles and permissions
- **Open Source Alternatives/Ideas:**
  - Model organizations as a DB entity
  - Use existing user/org management patterns

## 7. RBAC Permission Checks
- **References:**
  - Backend: `PermissionCheck.ts`, `Permissions.ts`, route guards
- **What to Rebuild:**
  - Middleware for permission checks
  - Permission assignment to roles/users
- **Open Source Alternatives/Ideas:**
  - [CASL](https://casl.js.org/), [node-casbin](https://casbin.org/)

## 8. Email Invites and Notifications
- **References:**
  - Backend: `sendEmail.ts`, invite flows in account/org services
- **What to Rebuild:**
  - Email invite for users
  - Notification emails for workspace/org events
- **Open Source Alternatives/Ideas:**
  - [Nodemailer](https://nodemailer.com/)
  - [Resend](https://resend.com/) or [SendGrid](https://sendgrid.com/)

---

## General Steps
1. Remove all `/enterprise` imports and usages from the codebase.
2. For each feature above, implement a new, original version using open-source libraries and your own logic.
3. Test each feature thoroughly.

---

**This roadmap is based on codebase analysis and should be updated as you discover more dependencies or requirements.** 