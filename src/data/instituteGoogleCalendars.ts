/** Source identifiers recovered from the public iframe on the legacy Institute website.
 *  Keep the original Base64 embed src values and source order/colors unchanged.
 *  No Google account secret, API key or personal calendar is required for embedding.
 */
export const instituteGoogleCalendars = [
  { calendarId: '909ec38e5e8b3ef8c9575a78f7a553ba86d188f43167d47ebd3d1e5f1533bae8@group.calendar.google.com', embedSrc: 'OTA5ZWMzOGU1ZThiM2VmOGM5NTc1YTc4ZjdhNTUzYmE4NmQxODhmNDMxNjdkNDdlYmQzZDFlNWYxNTMzYmFlOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t', color: '#009688' },
  { calendarId: 'b08841947770dbb93afc6d8117a255babda7ed53db9f820ad5b7745214a9a67e@group.calendar.google.com', embedSrc: 'YjA4ODQxOTQ3NzcwZGJiOTNhZmM2ZDgxMTdhMjU1YmFiZGE3ZWQ1M2RiOWY4MjBhZDViNzc0NTIxNGE5YTY3ZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t', color: '#b39ddb' },
  { calendarId: 'a1223ab7a5f1f33a6e84af04b1534e99f3de550996dae639332d76f4fa8a839d@group.calendar.google.com', embedSrc: 'YTEyMjNhYjdhNWYxZjMzYTZlODRhZjA0YjE1MzRlOTlmM2RlNTUwOTk2ZGFlNjM5MzMyZDc2ZjRmYThhODM5ZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t', color: '#4152b0' },
  { calendarId: 'b9926a1980736fe12bd15420e9e59d14b10144cf04b28efe965833714b2251ec@group.calendar.google.com', embedSrc: 'Yjk5MjZhMTk4MDczNmZlMTJiZDE1NDIwZTllNTlkMTRiMTAxNDRjZjA0YjI4ZWZlOTY1ODMzNzE0YjIyNTFlY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t', color: '#f6bf26' },
  { calendarId: '025f9198a102fe014576e0b71e7b054e024d8ac7c42697a0dfe95ebc5d7bb654@group.calendar.google.com', embedSrc: 'MDI1ZjkxOThhMTAyZmUwMTQ1NzZlMGI3MWU3YjA1NGUwMjRkOGFjN2M0MjY5N2EwZGZlOTVlYmM1ZDdiYjY1NEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t', color: '#d50000' },
  { calendarId: '0dc3320a2c1cd70893231c06faf192757f64300e08f4f015a6a087380842d66c@group.calendar.google.com', embedSrc: 'MGRjMzMyMGEyYzFjZDcwODkzMjMxYzA2ZmFmMTkyNzU3ZjY0MzAwZTA4ZjRmMDE1YTZhMDg3MzgwODQyZDY2Y0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t', color: '#1ef4c2' },
  { calendarId: 'a6bebe0ddc72f1c4b8c11e59a9921b8da77b54e1eed0d3650c557faa47d06956@group.calendar.google.com', embedSrc: 'YTZiZWJlMGRkYzcyZjFjNGI4YzExZTU5YTk5MjFiOGRhNzdiNTRlMWVlZDBkMzY1MGM1NTdmYWE0N2QwNjk1NkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t', color: '#c0ca33' },
] as const;

export type CalendarEmbedMode = 'MONTH' | 'AGENDA';

export function instituteCalendarEmbedUrl(mode: CalendarEmbedMode) {
  const params = new URLSearchParams({
    wkst: '1',
    ctz: 'Europe/Kiev', // Google Calendar's original embed timezone alias for Kyiv
    showPrint: '0',
    showTitle: '0',
    showTabs: '0',
    showCalendars: '1',
    showTz: '0',
    mode,
  });

  // Multiple src/color parameters are intentional; there are seven calendars.
  for (const calendar of instituteGoogleCalendars) {
    params.append('src', calendar.embedSrc);
  }
  for (const calendar of instituteGoogleCalendars) {
    params.append('color', calendar.color);
  }
  return `https://calendar.google.com/calendar/embed?${params.toString()}`;
}
