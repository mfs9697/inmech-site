# Institute events calendar — design pilot

The new bilingual routes `/events/` and `/en/events/` provide a responsive,
accessible monthly browser (desktop) and agenda list (mobile).

## Source integrity

The previous events page `https://old.inmech.kyiv.ua/l/ua/calendar_g/`
appears to use Google Calendar, but its current HTML / embedded public calendar
IDs could not be retrieved from the accessible source. The connected personal
Google Calendar account does **not** list the Institute calendars.

**Do not** replace these records with unrelated personal calendars or
invent placeholder event details. The new source is intentionally empty until
verified. The site explains this visibly and links to the legacy calendar.

## Connecting verified public data

- Obtain and validate the public institutional Google Calendar IDs/ICS feeds
  from the old page or the original calendar owner.
- Confirm publication rights and that event descriptions contain no private
  attendee information.
- Implement a public-data synchronization step (including recurrence,
  cancellations, timezone Europe/Kyiv, historical records and errors).
- Populate `src/data/instituteEvents.ts` with verified event records or
  replace it with a generated module.
- Rebuild and test desktop and mobile views; only then remove the visible
  migration note.

This is a design/UX PR, **not** a completed Google Calendar migration.
