# TDO Founder OS

TDO Founder OS is a private, database-backed Founder Life OS built around one question: **what matters most right now?**

## Full product scope shipped in code

- **TODAY:** automatic London-local date/day type, mission, capacity, ranked MUST / SHOULD / IF TIME, carry-forward, decision-required escalation, transparent 100-point evidence-based daily score.
- **Execution:** tasks, goals, projects-ready task fields, recurring/carry metadata, deadlines, time blocks and calendar foundations.
- **TDO / Sales:** revenue target and gap, weighted pipeline, funnel stages, lead follow-up views, sales activity API, content workflow.
- **Money:** monthly revenue/expense/net, configurable target, CSV export/import surface.
- **Health:** sleep, quality, steps, exercise, water, nutrition, energy, mood and recovery logging.
- **Learning:** roadmap stages from Beginner through Projects, hours, modules and confidence.
- **Network:** relationship strength and next-contact tracking.
- **Life:** experiences, memories and journal/reflection.
- **Reviews:** weekly/monthly CEO review records.
- **Copilot:** deterministic, grounded recommendations from recorded DB data only; it does not invent missing facts.
- **Search/export:** global search across core records and JSON export API.
- **Settings:** timezone, working hours, income target, learning/content targets and notifications.
- **Auth/data:** Supabase SSR auth, RLS policies, user-scoped data, signup profile trigger.
- **Responsive UI:** mobile search shell plus desktop navigation.

## Architecture

Next.js App Router + TypeScript + Tailwind CSS + Supabase/PostgreSQL.

## Database

Run the baseline schema, then migrations in order:

1. `supabase/schema.sql`
2. `supabase/migrations/003_profile_trigger.sql`
3. `supabase/migrations/004_full_os.sql`

The final migration adds the full OS domains and RLS policies.

## Environment

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` for the workbook importer
- `TDO_IMPORT_USER_EMAIL` for workbook import

## Workbook import

The importer maps the existing workbook into real app records rather than displaying the spreadsheet as a web page:

`npm run import:workbook`

Before importing, set `TDO_IMPORT_USER_EMAIL` to the authenticated founder account. Review the importer before repeating imports so records are not duplicated.

## Verification

GitHub Actions runs `npm install` and `npm run build` on every push/PR. A successful CI run is required before deployment.

## Deployment

The code is deployment-ready for a Next.js host such as Vercel once the Supabase project is connected and the environment variables are configured. No production deployment or live Supabase credentials are included in the repository.
