'use client';

import { useEffect, useState } from 'react';
import { FormProvider, useForm, useFieldArray } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import z from 'zod';

import { InstagramUrlInput } from './ui/InstagramUrlInput';
import { HashTagInput } from './ui/HashTagInput';
import { RegisterPlaceCard } from './ui/RegisterPlaceCard';
import { createPlaceDefault } from './model/place.default';
import { registerPlaceSchema } from './model/place.schema';

import {
  ICreateEditorPostRequest,
  IEditEditorPostRequest,
} from '@/entities/editor/place/model/editorPlace.type';

import { useEditorCreatePost } from '@/entities/editor/place/mutations/useEditorCreatePost';
import { useEditorEditPosts } from '@/entities/editor/place/mutations/useEditorEditPosts';
import { useEditorDeletePost } from '@/entities/editor/place/mutations/useEditorDeletePost';
import { useEditorGetPlaceByPostPlaceId } from '@/entities/editor/place/mutations/useEditorGetPlaceByPostPlaceId';

const createDefaultPlace = () => createPlaceDefault();

export const RegisterPlacePage = () => {
  const searchParams = useSearchParams();

  const postPlaceIdParam = searchParams?.get('postPlaceId') ?? '';
  const postPlaceId = postPlaceIdParam ? Number(postPlaceIdParam) : undefined;

  const [createdPostId, setCreatedPostId] = useState<number | undefined>(undefined);
  const isEdit = !!postPlaceIdParam || !!createdPostId;

  const methods = useForm<z.infer<typeof registerPlaceSchema>>({
    defaultValues: {
      url: '',
      hashTags: [],
      placeInfoRequestList: [createDefaultPlace()],
    },
  });

  const { control, handleSubmit, reset } = methods;

  const { fields, append } = useFieldArray({
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
    },
  });

  const { editEditorPost } = useEditorEditPosts();
  const { deleteEditorPost } = useEditorDeletePost();

  const onSubmit = (data: ICreateEditorPostRequest | IEditEditorPostRequest) => {
    const placeInfoRequestList = data.placeInfoRequestList.map((place) => ({
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
    }));

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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="px-5">
        <InstagramUrlInput className="pt-2.5 pb-8" />
        <div className="-mx-5 border-b border-neutral-30" />

        <HashTagInput className="pt-4 pb-8" />
        <div className="-mx-5 border-b border-neutral-30" />

        <div className="-mx-5 py-8 bg-neutral-20">
          <div className="px-5 flex flex-col gap-4">
            {fields.map((field, index) => (
              <RegisterPlaceCard key={field.id} placeIndex={index + 1} />
            ))}

            <button
              type="button"
              onClick={() => append(createDefaultPlace())}
              className="w-full h-12 rounded-xl border-2 border-dashed border-neutral-30 text-primary-40"
            >
              장소 추가 +
            </button>

            {isEdit ? (
              <button
                type="submit"
                className="w-full h-12 rounded-xl border-neutral-30 bg-primary-50 text-neutral-10"
              >
                수정하기
              </button>
            ) : (
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-primary-40 text-neutral-10"
              >
                등록하기
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
                게시글 전체 삭제
              </button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
