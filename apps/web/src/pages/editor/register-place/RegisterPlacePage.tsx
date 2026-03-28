'use client';

import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { useRouter } from '@/shared/lib/i18n/navigation';

import { InstagramUrlInput } from './ui/InstagramUrlInput';
import { HashTagInput } from './ui/HashTagInput';
import { RegisterPlaceCard } from './ui/RegisterPlaceCard';
import { RegisterFinishModal } from './ui/RegisterFinishModal';
import { createPlaceDefault } from './model/place.default';
import { createRegisterPlaceSchema, type RegisterPlaceFormValues } from './model/place.schema';

import { useEditorCreatePost } from '@/entities/editor/place/mutations/useEditorCreatePost';
import { useEditorEditPosts } from '@/entities/editor/place/mutations/useEditorEditPosts';
import { useEditorDeletePost } from '@/entities/editor/place/mutations/useEditorDeletePost';
import { useEditorGetPlaceByPostPlaceId } from '@/entities/editor/place/mutations/useEditorGetPlaceByPostPlaceId';

const createDefaultPlace = () => createPlaceDefault();

export const RegisterPlacePage = () => {
  const locale = useLocale();
  const t = useTranslations('editorRegisterPlace');
  const schema = useMemo(() => createRegisterPlaceSchema(t), [locale, t]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const postPlaceIdParam = searchParams?.get('postPlaceId') ?? '';
  const postPlaceId = postPlaceIdParam ? Number(postPlaceIdParam) : undefined;

  const [createdPostId, setCreatedPostId] = useState<number | undefined>(undefined);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const isEdit = !!postPlaceIdParam || !!createdPostId;

  const methods = useForm<RegisterPlaceFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      url: '',
      hashTags: [],
      placeInfoRequestList: [createDefaultPlace()],
    },
  });

  const { control, handleSubmit, reset } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'placeInfoRequestList',
  });

  const { placeData } = useEditorGetPlaceByPostPlaceId(postPlaceId);

  useEffect(() => {
    if (!postPlaceId || !placeData?.data) return;

    const { url, hashTags, postPlaces } = placeData.data;

    reset({
      url,
      hashTags: hashTags ?? [],
      placeInfoRequestList: postPlaces.map((place) => ({
        postPlaceId: place.postPlaceId,
        placeName: place.placeName,
        description: place.description ?? '',
        addressName: place.addressName ?? '',
        roadAddressName: place.roadAddressName ?? '',
        latitude: place.latitude,
        longitude: place.longitude,
        categoryIds: place.categoryIds ?? [],
        nearestStationWalkTime: place.nearestStationWalkTime ?? '',
        placeUrl: place.placeUrl ?? '',
        phoneNumber: place.phoneNumber ?? '',
        imageUrl: place.imageUrl ?? '',
      })),
    });
  }, [postPlaceId, placeData, reset]);

  const { createEditorPost } = useEditorCreatePost({
    onSuccess: (data) => {
      const postId = data.data?.postId;
      if (!postId) return;

      setCreatedPostId(postId);
      setIsFinishModalOpen(true);
    },
  });

  const { editEditorPost } = useEditorEditPosts();
  const { deleteEditorPost } = useEditorDeletePost();

  const onSubmit = (data: RegisterPlaceFormValues) => {
    const placeInfoRequestList = data.placeInfoRequestList.map((place) => {
      const base = {
        placeName: place.placeName,
        description: place.description ?? '',
        addressName: place.addressName,
        roadAddressName: place.roadAddressName,
        latitude: place.latitude,
        longitude: place.longitude,
        categoryIds: place.categoryIds,
        nearestStationWalkTime: place.nearestStationWalkTime,
        placeUrl: place.placeUrl,
        phoneNumber: place.phoneNumber,
        imageUrl: place.imageUrl,
      };

      if (place.postPlaceId) {
        return { ...base, postPlaceId: place.postPlaceId };
      }

      return base;
    });

    if (!isEdit) {
      createEditorPost({
        url: data.url,
        hashTags: data.hashTags,
        placeInfoRequestList,
      });
      return;
    }

    const postId = placeData?.data?.postId ?? createdPostId;
    if (!postId) return;

    editEditorPost({
      postId,
      body: {
        url: data.url,
        hashTags: data.hashTags,
        placeInfoRequestList,
      },
    });
  };

  return (
    <FormProvider {...methods} key={locale}>
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="px-5">
          <InstagramUrlInput className="pt-2.5 pb-8" />
          <div className="-mx-5 border-b border-neutral-30" />

          <HashTagInput className="pt-4 pb-8" />
          <div className="-mx-5 border-b border-neutral-30" />

          <div className="-mx-5 py-8 bg-neutral-20">
            <div className="px-5 flex flex-col gap-4">
              {fields.map((field, index) => (
                <RegisterPlaceCard
                  key={field.id}
                  placeIndex={index + 1}
                  canDelete={fields.length >= 2}
                  onRemove={() => remove(index)}
                />
              ))}

              <button
                type="button"
                onClick={() => append(createDefaultPlace())}
                className="w-full h-12 rounded-xl border-2 border-dashed border-neutral-30 text-primary-40"
              >
                {t('page.addPlace')}
              </button>

              {isEdit ? (
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl border-neutral-30 bg-primary-50 text-neutral-10"
                >
                  {t('page.submitEdit')}
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-primary-40 text-neutral-10"
                >
                  {t('page.submitRegister')}
                </button>
              )}
              {isEdit && (
                <button
                  type="button"
                  onClick={() => {
                    const postId = placeData?.data?.postId ?? createdPostId;
                    if (!postId) return;
                    deleteEditorPost(postId);
                  }}
                  className="w-full h-12 rounded-xl border-neutral-30 bg-transparent body-16-semibold text-neutral-40"
                >
                  {t('page.deletePost')}
                </button>
              )}
            </div>
          </div>
        </form>

        <RegisterFinishModal
          isOpen={isFinishModalOpen}
          onClose={() => setIsFinishModalOpen(false)}
          onConfirm={() => {
            setIsFinishModalOpen(false);
            router.replace('/editor/profile');
          }}
        />
      </>
    </FormProvider>
  );
};
