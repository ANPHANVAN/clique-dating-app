import { Availability } from "@/types/model"

export function findFirstOverlap(
  slotsA: Availability[],
  slotsB: Availability[]
) {
  for (const a of slotsA) {
    for (const b of slotsB) {
      if (a.date !== b.date) continue

      const start = Math.max(a.start, b.start)
      const end = Math.min(a.end, b.end)

      if (start < end) {
        return {
          date: a.date,
          start,
          end,
        }
      }
    }
  }

  return null
}