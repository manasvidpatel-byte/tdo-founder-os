import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * TDO is a single-founder application. There is intentionally no sign-in UI.
 * Server-side data access runs with the Supabase service role and scopes every
 * application query to the configured founder profile.
 */
export async function supabaseServer() {
  const client = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const configuredId = process.env.TDO_FOUNDER_USER_ID;
  let founderId = configuredId || "";

  if (!founderId) {
    const { data } = await client
      .from("profiles")
      .select("id")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    founderId = data?.id || "";
  }

  return {
    ...client,
    auth: {
      getUser: async () => ({
        data: {
          user: founderId
            ? ({ id: founderId } as { id: string })
            : null,
        },
        error: founderId ? null : new Error("No TDO founder profile is configured."),
      }),
    },
  };
}
