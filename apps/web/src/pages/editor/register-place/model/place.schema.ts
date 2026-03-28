import z from 'zod';

export function createRegisterPlaceSchema(t: (key: string) => string) {
  const placeSchema = z.object({
    postPlaceId: z.number().optional(),
    placeName: z.string().min(1, t('validation.placeName')),
    description: z.string().min(1, t('validation.description')),
    addressName: z.string().min(1, t('validation.addressName')),
    roadAddressName: z.string().min(1, t('validation.roadAddressName')),
    latitude: z.number(),
    longitude: z.number(),
    categoryIds: z.array(z.number()).min(1, t('validation.categoryIds')),
    nearestStationWalkTime: z.string().min(1, t('validation.nearestStationWalkTime')),
    placeUrl: z.string().min(1, t('validation.placeUrl')),
    phoneNumber: z.string().optional(),
    imageUrl: z.string().min(1, t('validation.imageUrl')),
  });

  return z.object({
    url: z.string().min(1, t('validation.url')),
    hashTags: z
      .array(z.string().min(1).max(6, t('validation.hashtagMaxLength')))
      .max(3, t('validation.hashtagMaxCount')),
    placeInfoRequestList: z.array(placeSchema).min(1, t('validation.minOnePlace')),
  });
}

export type RegisterPlaceFormValues = z.infer<ReturnType<typeof createRegisterPlaceSchema>>;
