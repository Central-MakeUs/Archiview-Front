type PlaceOption = 'ALL' | 'MOST_VIEWED' | 'MOST_SAVED' | 'MOST_INSTAGRAM' | 'MOST_DIRECTIONS';

export function parseMetric(value: string | null): PlaceOption {
  switch (value) {
    case 'MOST_VIEWED':
    case 'MOST_SAVED':
    case 'MOST_INSTAGRAM':
    case 'MOST_DIRECTIONS':
    case 'ALL':
      return value;
    default:
      return 'ALL';
  }
}
