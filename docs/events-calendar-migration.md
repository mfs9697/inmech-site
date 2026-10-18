# Institute events calendar — live embedded sources

The bilingual event pages `/events/` and `/en/events/` embed the original
Institute calendars directly from Google Calendar. The page has a modern,
responsive site-owned shell, a `MONTH` / `AGENDA` switch, an agenda default
on small screens, and an accessible external-calendar fallback.

## Source provenance

The legacy page is
`https://old.inmech.kyiv.ua/l/ua/calendar_g/`.

The owner copied its exact Google Calendar iframe URL, with **seven**
`src` values and seven corresponding color parameters. They are stored in
`src/data/instituteGoogleCalendars.ts`, both as original embed parameters
and their decoded Google Calendar IDs.

The connected Google Calendar account could read events for six of these
seven IDs in the range 2026-01-01 through 2027-12-31. One ID returned no
events in that interval. This **does not prove anonymous/public readability**
of each source; the account's calendar list also does not show them.

## Publication checklist

1. In a private/incognito browser session, verify both new pages load actual
   Institute events **without** Google sign-in.
2. Check all seven original sources and their colors, recent and historical
   entries, timezone (the old Google embed uses `Europe/Kiev`), month and
   agenda modes, desktop and mobile view.
3. Confirm that no non-public events are displayed; otherwise obtain
   permission or adjust Google Calendar sharing and visibility with its owner.
4. Inspect keyboard navigation and fallback links.
5. After checks and Code Owner approval, merge the PR.

## Architectural notes

The displayed data stays in Google Calendar and updates automatically
without new website builds. The main website does not store access tokens,
API keys, private calendar event details, or attendee information.

Google Calendar iframe internals cannot be restyled or transformed into
native cards due to browser cross-origin restrictions. A future fully custom
agenda/card implementation would need an audited public ICS feed or Google
Calendar API data pipeline (including recurrence, cancelled events, timezones,
and refresh cadence). Do not claim that this iframe is a native events API.
