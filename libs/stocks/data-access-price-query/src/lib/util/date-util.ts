import { RANGE, PERIODS } from '../+state/price-query.ranges';

export function getSmallestRange(from: Date | null): RANGE {
  if (!from) {
    return RANGE.MAX;
  }

  const daysFromNow = getDiffDaysFromNow(from);
  const smallestPeriod = PERIODS.find(p => p.days >= daysFromNow);

  return smallestPeriod ? smallestPeriod.range : RANGE.MAX;
}

function getDiffDaysFromNow(date: Date): number {
  const now = new Date().setHours(0, 0, 0, 0);
  const diff = Math.abs(now - date.getTime());
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
