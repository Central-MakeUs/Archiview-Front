'use client';

import { useEffect } from 'react';
import { FormProvider, useForm, useFieldArray } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
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
import { useEditorGetPostDetail } from '@/entities/editor/place/queries/useEditorGetPostDetail';

const createDefaultPlace = () => createPlaceDefault();

export const RegisterPlacePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const placeIdParam = searchParams?.get('placeId') ?? '';
  const postId = placeIdParam ? Number(placeIdParam) : null;
  const isEdit = postId !== null;

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

  // TODO: 상세페이지 조회 API 나오면 연결하기
  // const { data: postDetail } = useEditorGetPostDetail(
  //   { postId: postId as number },
  //   { enabled: isEdit },
  // );

  // useEffect(() => {
  //   if (!postDetail) return;

  //   reset({
  //     url: postDetail.data.url,
  //     hashTags: postDetail.data.hashTags,
  //     placeInfoRequestList: postDetail.data.placeInfoList.map((place) => ({
  //       placeName: place.placeName,
  //       description: place.description ?? '',
  //       addressName: place.addressName,
  //       roadAddressName: place.roadAddressName,
  //       latitude: place.latitude,
  //       longitude: place.longitude,
  //       categoryIds: place.categoryIds,
  //       nearestStationWalkTime: place.nearestStationWalkTime,
  //       placeUrl: place.placeUrl,
  //       phoneNumber: place.phoneNumber,
  //       imageUrl: place.imageUrl,
  //     })),
  //   });
  // }, [postDetail, reset]);

  const { createEditorPost } = useEditorCreatePost({
    onSuccess: (data) => {
      const createdPostId = data.data?.postId;
      if (!createdPostId) return;

      router.replace(`/editor/register-place?placeId=${createdPostId}`, {
        scroll: false,
      });
    },
  });

  const { editEditorPost } = useEditorEditPosts();

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

    editEditorPost({
      postId: postId as number,
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
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
