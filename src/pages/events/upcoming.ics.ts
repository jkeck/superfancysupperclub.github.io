import type { APIRoute } from 'astro';
import upcoming from '../../data/upcoming.json';

// "2026-06-14T19:00:00" → "20260614T190000"
function dtFmt(dateStr: string): string {
  return dateStr.replace(/[-:]/g, '');
}

function dtEndFmt(dateStr: string): string {
  const [datePart, timePart] = dateStr.split('T');
  const [y, mo, d] = datePart.split('-').map(Number);
  const [h, mi, s] = timePart.split(':').map(Number);
  const end = new Date(y, mo - 1, d, h, mi + 150, s ?? 0); // +2h30m
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${end.getFullYear()}${pad(end.getMonth() + 1)}${pad(end.getDate())}T${pad(end.getHours())}${pad(end.getMinutes())}${pad(end.getSeconds())}`;
}

function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
}

export const GET: APIRoute = () => {
  const u = upcoming as typeof upcoming & { secret?: boolean; location?: string };

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Super Fancy Supper Club//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${dtFmt(u.date)}`,
    `DTEND:${dtEndFmt(u.date)}`,
  ];

  if (u.secret) {
    lines.push('SUMMARY:Super Fancy Supper Club — Dinner');
    lines.push('DESCRIPTION:Details will be shared with attendees.\\n\\nSee you there.');
  } else {
    lines.push(`SUMMARY:Super Fancy Supper Club · ${esc(u.name)}`);
    if (u.location) lines.push(`LOCATION:${esc(u.location)}`);
    if (u.teaser)   lines.push(`DESCRIPTION:${esc(u.teaser)}\\n\\nSee you there.`);
  }

  lines.push('URL:https://superfancysupperclub.com/upcoming');
  lines.push('END:VEVENT');
  lines.push('END:VCALENDAR');

  return new Response(lines.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="superfancysupperclub.ics"',
    },
  });
};
