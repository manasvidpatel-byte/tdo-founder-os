# TDO Founder OS

A private, database-backed Founder Life OS built around one question: **what matters most right now?**

## Stack
Next.js App Router, TypeScript, Tailwind CSS, Supabase Auth/PostgreSQL, Zod validation and Vercel-compatible deployment.

## Implemented
- Adaptive TODAY engine using the configured timezone, day type, capacity, calendar load, deadlines, revenue activity, health, learning and life records.
- Monday–Wednesday maintenance, Thursday execution, Friday sales, Saturday life/brand and Sunday review defaults, with settings overrides.
- Idempotent daily plans with 1 mission, 3 MUST, 3 SHOULD and 3 IF TIME recommendations.
- Deadline preservation and repeated-postponement escalation to DECISION REQUIRED.
- Transparent 100-point daily score using recorded data only.
- Tasks, goals, projects-ready task relationships, time blocks and events.
- TDO command centre, CRM stages, follow-up views, sales activity and weighted pipeline.
- Content workflow: Idea → Draft → Review → Scheduled → Published.
- Money tracking with revenue/expense/net calculations and CSV export.
- Health logging and weekly-ready historical data.
- Learning roadmap plus real learning-session records.
- Network contacts, life experiences and journal entries.
- Weekly/monthly CEO reviews and historical preservation.
- Global search across core OS entities.
- Grounded Copilot: deterministic database facts/calculations and question answering; it does not invent missing records.
- Supabase RLS, server-side authentication and Zod validation.
- Mobile navigation and accessible focus states.
- Idempotent workbook importer with legacy natural-key checks and no-delete behavior.
- GitHub Actions production build verification.

## Database migrations
Apply in order in Supabase:
1. `supabase/schema.sql`
2. `supabase/migrations/002_phase2.sql`
3. `supabase/migrations/003_profile_trigger.sql`
4. `supabase/migrations/004_full_os.sql`
5. `supabase/migrations/005_production_hardening.sql`

The latest migration adds idempotent import keys, goal progress fields, learning sessions, Founder Lab records, configurable day-type overrides and supporting indexes/RLS.

## Environment
Set these in local development and Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — importer only; never expose to the browser
- `TDO_IMPORT_USER_EMAIL` — authenticated founder account used by the importer

## Workbook import
Run:

`npm install`
`npm run import:workbook -- /path/to/TDO_October_2026_Workbook_v2.xlsx`

The importer maps the workbook's Daily Log, October Calendar, Content Calendar, Lead Tracker, Events, Networking CRM, Learning Tracker and Dream Life data into relational records. It uses stable hashes plus natural keys for legacy records, skips duplicates, never deletes existing user data and prints imported/skipped/error counts.

## Deployment
1. Create a Supabase project.
2. Apply the migrations in order.
3. Enable email/password Auth and configure the application callback URL.
4. Set the public Supabase URL/key in Vercel.
5. Keep the Supabase service-role key only in a secure server/import environment.
6. Run the workbook import once against the intended founder account.
7. Deploy the Next.js repository to Vercel.

The repository's GitHub Actions workflow runs `npm install` and `npm run build` on pushes and pull requests to `main`.
