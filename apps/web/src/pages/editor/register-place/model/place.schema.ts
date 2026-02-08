import z from 'zod';

export const placeSchema = z.object({
  placeName: z.string().min(1, '장소 이름을 입력해주세요'),
  description: z.string().min(1, '장소 설명을 입력해주세요'),
  addressName: z.string().min(1, '주소를 입력해주세요'),
  roadAddressName: z.string().min(1, '도로명 주소를 입력해주세요'),
  latitude: z.number(),
  longitude: z.number(),
  categoryIds: z.array(z.number()).min(1, '카테고리를 선택해주세요'),
  nearestStationWalkTime: z.string().min(1, '최단 거리를 입력해주세요'),
  placeUrl: z.string().min(1, '장소 URL을 입력해주세요'),
  phoneNumber: z.string().optional(),
  imageUrl: z.string().min(1, '이미지 URL을 입력해주세요'),
});

export const registerPlaceSchema = z.object({
  url: z.string().min(1, 'URL을 입력해주세요'),
  hashTags: z
    .array(z.string().min(1).max(6, '해시태그는 최대 6글자까지 가능합니다'))
    .max(3, '해시태그는 최대 3개까지 추가할 수 있습니다'),
  placeInfoRequestList: z.array(placeSchema).min(1, '최소 1개의 장소가 필요합니다'),
});
