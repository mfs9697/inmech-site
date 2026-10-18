/**
 * Institute event records, separate from news posts.
 *
 * Keep this empty until the public Google Calendar source is verified.
 * Do not copy events from private/personal calendars or invent entries.
 *
 * Dates use Europe/Kyiv local calendar dates (YYYY-MM-DD), endDate is inclusive.
 * The website reads this module at build time, so new entries require a rebuild.
 * Once the legacy public calendar IDs are recovered, replace manual maintenance
 * with a verified public-calendar synchronization step.
 */
export type InstituteEvent = {
  id: string;
  date: string;
  endDate?: string;
  time?: string; // HH:mm, Kyiv time
  titleUk: string;
  titleEn?: string;
  categoryUk?: string;
  categoryEn?: string;
  locationUk?: string;
  locationEn?: string;
  url?: string; // verified, public event details
};

export const instituteEvents: InstituteEvent[] = [];
