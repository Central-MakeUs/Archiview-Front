export const EXTERNAL_URL = {
  KAKAO_MAP_SEARCH_BASE: 'https://map.kakao.com/link/search/',
  KAKAO_MAP_TO_BASE: 'https://map.kakao.com/link/to/',
  KAKAO_MAP_FROM_TO_BASE: 'https://map.kakao.com/link/from/',
} as const;

const normalizeWhitespace = (raw: string) => raw.replace(/\s+/g, ' ').trim();

const looksLikeKoreanAddress = (raw: string) => {
  const s = normalizeWhitespace(raw);
  if (!s) return false;
  return (
    /(?:로|길|대로|번길|거리)\s*\d/.test(s) ||
    /\d+(?:층|호|동)\b/.test(s) ||
    /(?:^|\s)지하\s*\d+층\b/.test(s)
  );
};

const stripParenthesesBlocks = (raw: string) => {
  return normalizeWhitespace(raw.replace(/\([^)]*\)/g, ' '));
};

export const normalizeKakaoMapSearchQuery = (raw: string): string => {
  const original = normalizeWhitespace(raw);
  if (!original) return '';
  if (!looksLikeKoreanAddress(original)) return original;

  const s = stripParenthesesBlocks(original);

  const roadMatch = s.match(/^(.*?(?:로|길|대로|거리|번길))\s*(\d+(?:-\d+)?)(?:\s|$)/);
  if (roadMatch) return normalizeWhitespace(`${roadMatch[1]} ${roadMatch[2]}`);

  const jibunMatch = s.match(/^(.*?(?:동|가|리))\s*((?:산\s*)?\d+(?:-\d+)?)(?:\s|$)/);
  if (jibunMatch) return normalizeWhitespace(`${jibunMatch[1]} ${jibunMatch[2]}`);

  const tokens = s.split(' ');
  const isDetailToken = (t: string) => {
    const x = t.replace(/[(),]/g, '').trim();
    if (!x) return true;
    if (/^(?:지하)?\d+층$/.test(x)) return true;
    if (/^(?:지하)?\d+층\d+호$/.test(x)) return true;
    if (/^\d+(?:-\d+)?호$/.test(x)) return true;
    if (/^\d+(?:-\d+)?동$/.test(x)) return true;
    if (/^[A-Za-z]\d*동$/.test(x)) return true;
    return false;
  };

  const kept: string[] = [];
  for (const t of tokens) {
    if (kept.length > 0 && isDetailToken(t)) break;
    kept.push(t);
  }
  const fallback = normalizeWhitespace(kept.join(' '));

  return fallback || original;
};

export const createKakaoMapSearchUrl = (query: string): string => {
  const normalized = normalizeKakaoMapSearchQuery(query);
  return `${EXTERNAL_URL.KAKAO_MAP_SEARCH_BASE}${encodeURIComponent(normalized)}`;
};

export const createKakaoMapToUrl = (name: string, latitude: number, longitude: number): string => {
  const safeName = name.trim();
  return `${EXTERNAL_URL.KAKAO_MAP_TO_BASE}${encodeURIComponent(safeName)},${latitude},${longitude}`;
};

export const createKakaoMapRouteFromToUrl = (params: {
  fromName: string;
  fromLatitude: number;
  fromLongitude: number;
  toName: string;
  toLatitude: number;
  toLongitude: number;
}): string => {
  const fromName = params.fromName.trim();
  const toName = params.toName.trim();

  const fromSegment = `${encodeURIComponent(fromName)},${params.fromLatitude},${params.fromLongitude}`;
  const toSegment = `${encodeURIComponent(toName)},${params.toLatitude},${params.toLongitude}`;

  return `${EXTERNAL_URL.KAKAO_MAP_FROM_TO_BASE}${fromSegment}/to/${toSegment}`;
};
