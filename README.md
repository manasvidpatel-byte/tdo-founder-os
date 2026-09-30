# TDO Founder OS

A production-oriented Founder Life OS built around the TDO October 2026 workbook.

## Phase 1 + 2 shipped
- Supabase/Postgres data model with RLS
- Magic-link authentication and session proxy
- Automatic Europe/London daily initialization
- Monday-Wednesday maintenance, Thursday execution, Friday sales, Saturday life, Sunday review day modes
- TODAY mission + capacity + live task queue
- Task creation/completion
- Calendar event creation
- TDO revenue command centre
- CRM lead creation, pipeline stages, follow-up/high-value/untouched views
- Revenue and expense tracking with target gap and CSV import/export
- Content calendar with Idea -> Draft -> Review -> Scheduled -> Published workflow
- Workbook importer for Lead Tracker, Content Calendar, Revenue target and Daily Planner actions
- GitHub Actions production build check

## Setup
1. Create a Supabase project.
2. Run supabase/schema.sql, then every migration in supabase/migrations/ in order.
3. Copy .env.example to .env.local and fill Supabase values.
4. Run npm install then npm run dev.
5. Sign in once, then optionally import the workbook with npm run import:workbook -- ./TDO_October_2026_Workbook_v2.xlsx using SUPABASE_SERVICE_ROLE_KEY and TDO_IMPORT_USER_EMAIL.

The workbook remains the source artifact for goals, planning assumptions, sales targets and content structure; runtime state lives in Postgres.

## Daily principle
The plan serves the person. The person does not serve the plan.
