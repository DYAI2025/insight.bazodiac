# Admin Flow — Approving Investor Requests

## When a new request comes in

1. Go to https://supabase.com/dashboard → project `bazodiac-investor`
2. Click **Table Editor** → `investor_requests`
3. New rows appear with `status = 'pending'`

## Approving an investor

1. Click the row to open it
2. Change `status` from `pending` to `approved`
3. Set `approved_at` to current timestamp (click field → type `now()`)
4. Click **Save**

## How the investor gets access

After approval, tell the investor to visit:

```
https://dyai2025.github.io/insight.bazodiac/login.html
```

They enter their approved email → receive a Magic Link by email → click → access granted.

**Alternative:** If the investor is already in Supabase Auth (tried logging in before approval), you can also go to **Auth → Users** and click "Send magic link" directly.

## Rejecting a request

Change `status` to `rejected`. The investor will see the "pending" state on the login page (we do not distinguish pending vs. rejected to the user for privacy).

## Monitoring

To see all requests by status, run in **SQL Editor**:

```sql
select email, name, company, status, created_at, approved_at
from investor_requests
order by created_at desc;
```

## Session duration

- Access token: expires after 1 hour
- Refresh token: valid for 1 week
- Investors with an active refresh token will not need to re-click a magic link for up to 1 week after their last activity.

## Security notes

- The `anon` key in `supabase-config.js` is the **public** key — safe to commit. It is protected by Row Level Security policies.
- The `service_role` key must **never** appear in frontend code. Keep it only in the Supabase dashboard.
- The investor content protection is JavaScript-based (client-side guard). This is adequate for pre-investment materials but not for classified data. Anyone disabling JS could read the raw HTML — but investors won't do this.
