import { PriceQueryResponse } from '../+state/price-query.type';

export function filterResults(
  res: PriceQueryResponse[],
  from: Date | null,
  to: Date | null
) {
  return res.filter(r => {
    const date = new Date(r.date);

    if (from && date < from) {
      return false;
    }

    if (to && date > to) {
      return false;
    }

    return true;
  });
}
