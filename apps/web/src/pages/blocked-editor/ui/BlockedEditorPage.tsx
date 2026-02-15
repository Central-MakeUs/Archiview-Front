'use client';

import { useGetBlockedEditors } from '@/entities/archiver/follow/queries/useGetBlockedEditors';

export const BlockedEditorPage = () => {
  const { data, isLoading, isError, error } = useGetBlockedEditors({ useMock: true });

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러: {(error as Error)?.message ?? '알 수 없는 오류'}</div>;

  console.log(data);
  return <>dfd</>;
};
