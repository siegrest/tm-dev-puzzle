import { PriceQueryResponse } from '../+state/price-query.type';
import { clearTime } from './date-util';

export function filterResults(
  res: PriceQueryResponse[],
  from: Date | null,
  to: Date | null
) {
  return res.filter(r => {
    const date = clearTime(r.date);

    if (from && date < from) {
      return false;
    }

    if (to && date > to) {
      return false;
    }

    return true;
  });
}
