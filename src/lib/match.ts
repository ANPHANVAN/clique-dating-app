import { Availability, Match, Dating } from '@/types/model';

export function findOverlap(match: Match, availabilities: Availability[]) {
  const aSlots = availabilities.filter((a) => a.userId === match.userA);

  const bSlots = availabilities.filter((b) => b.userId === match.userB);

  for (const a of aSlots) {
    for (const b of bSlots) {
      if (a.date === b.date) {
        const start = Math.max(a.start, b.start);
        const end = Math.min(a.end, b.end);

        if (start < end) {
          return { date: a.date, start, end };
        }
      }
    }
  }

  return null;
}

export function shouldCreateDating(matchId: string, datings: Dating[]) {
  return !datings.some((d) => d.matchId === matchId);
}
