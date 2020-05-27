import { RANGE, PERIODS } from '../+state/price-query.ranges';

export function getSmallestRange(from: Date | null): RANGE {
  if (!from) {
    return RANGE.MAX;
  }

  const daysFromNow = getDiffDaysFromNow(from);
  const smallestPeriod = PERIODS.find(p => p.days >= daysFromNow);

  return smallestPeriod ? smallestPeriod.range : RANGE.MAX;
}

export function clearTime(date: Date | string): Date {
  const dateWithoutTime = new Date(date);
  dateWithoutTime.setHours(0, 0, 0, 0);
  return dateWithoutTime;
} 

function getDiffDaysFromNow(date: Date): number {
  const now = clearTime(new Date());
  const diff = Math.abs(now.getTime() - date.getTime());
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
