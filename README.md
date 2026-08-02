# FlowDesk

FlowDesk is a full-stack team workspace for planning projects, assigning and tracking work, and keeping task discussions in one place. It provides separate administrator and member experiences, backed by PostgreSQL.

## What it does

- Creates projects with an owner, team lead, members, dates, optional cover image, and status.
- Creates tasks with an assignee, due date, priority, and workflow status (`PLANNING`, `IN_PROGRESS`, `DONE`, or `DELAYED`).
- Gives members access to projects they own or belong to, along with their related tasks.
- Supports task comments and one level of threaded replies.
- Lets administrators create team members, generate employee IDs, and send time-limited account-activation invitations by email.
- Provides administrator analytics for task-status distribution and per-project completion progress.
- Supports profile images and project images through Cloudinary. The upload API accepts authenticated JPG, PNG, and WebP files up to 5 MB.
- Supports email/password authentication, with optional Google and GitHub OAuth for administrator accounts.

## Roles and onboarding

FlowDesk has two roles: `ADMIN` and `USER`.

The first account registered through the app is promoted to `ADMIN`; subsequent public registration is disabled. Administrators can create user accounts and send activation links that expire after 24 hours. Activated users set their own password before signing in.

## Tech stack

- [Next.js 16](https://nextjs.org/) with React 19 and TypeScript
- Tailwind CSS 4 and shadcn/ui-style components
- PostgreSQL with Prisma 7 and the Prisma PostgreSQL adapter
- [Better Auth](https://www.better-auth.com/) for credentials, sessions, admin roles, and OAuth
- Cloudinary for image storage
- Nodemailer (Gmail transport) for invitations
- Recharts for dashboard analytics
- Zod for server-side form validation

## Prerequisites

- Node.js 20.9 or later
- npm
- A PostgreSQL database

Cloudinary, Gmail, Google OAuth, and GitHub OAuth are only needed for the features that use them.

## Local setup

1. Install dependencies.

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root. Use the configuration below as a starting point.

   ```env
   # Required
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/flowdesk"
   BETTER_AUTH_SECRET="replace-with-a-long-random-secret"
   BETTER_AUTH_URL="http://localhost:3000"

   # Optional: Google OAuth
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""

   # Optional: GitHub OAuth
   GITHUB_CLIENT_ID=""
   GITHUB_CLIENT_SECRET=""

   # Optional: Cloudinary image uploads
   CLOUDINARY_NAME=""
   CLOUDINARY_API_KEY=""
   CLOUDINARY_API_SECRET=""

   # Optional: Gmail invitations
   EMAIL_USER=""
   EMAIL_PASS=""
   ```

   `EMAIL_PASS` should be a Gmail app password, not your normal Gmail password. If email is not configured, an administrator can still create a user, but the app will report that the invitation message could not be delivered.

3. Generate the Prisma client and apply the existing migrations.

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. Start the development server.

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000), register the first account, then use the administrator workspace to add team members, projects, and tasks.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server. |
| `npm run build` | Creates a production build. |
| `npm run start` | Runs the production server after a build. |
| `npm run lint` | Runs ESLint across the project. |

For a production database, use `npx prisma migrate deploy` instead of `prisma migrate dev`.

## Application areas

| Area | Routes | Purpose |
| --- | --- | --- |
| Public | `/`, `/signin`, `/register`, `/activate` | Landing page, authentication, and invitation activation. |
| Member workspace | `/dashboard`, `/projects`, `/tasks`, `/profile` | View relevant projects and tasks, collaborate in task discussions, and manage a profile. |
| Administrator workspace | `/admin/dashboard`, `/admin/projects`, `/admin/tasks`, `/admin/users`, `/admin/analytics`, `/admin/profile` | Manage the workspace, users, projects, tasks, and analytics. |
| APIs | `/api/auth/[...all]`, `/api/upload` | Better Auth handler and authenticated image uploads. |

## Data model

The PostgreSQL schema centers on these relationships:

```text
User ── owns / leads ──> Project ── has ──> Task ── has ──> Comment
  │                         │              │
  └── ProjectMember ────────┘              └── assigned to User

Comment ── may reply to ──> Comment
Task ── may have ──> Tag
```

Authentication session, account, and verification models are managed alongside the application models in `prisma/schema.prisma`.

## Project structure

```text
app/             Next.js routes, layouts, and API endpoints
action/          Server actions for authentication and workspace operations
components/      Feature components and reusable UI primitives
lib/             Authentication, Prisma, uploads, email, and validation helpers
prisma/          Database schema and migration history
public/          Static assets
```

## Verification

The current codebase passes `npm run lint` with no errors. ESLint reports 13 non-blocking warnings, primarily unused imports, a hook dependency warning, and an image-optimization suggestion.

## License

No license file is currently included. Add one before distributing the project publicly.
