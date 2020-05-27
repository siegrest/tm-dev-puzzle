export enum RANGE {
  NONE = 'none',
  M1 = '1m',
  M3 = '3m',
  M6 = '6m',
  Y1 = '1y',
  Y2 = '2y',
  Y5 = '5y',
  MAX = 'max'
}

export const PERIODS = [
  { days: 30, range: RANGE.M1 },
  { days: 90, range: RANGE.M3 },
  { days: 180, range: RANGE.M6 },
  { days: 365, range: RANGE.Y1 },
  { days: 730, range: RANGE.Y2 },
  { days: 1825, range: RANGE.Y5 }
];
