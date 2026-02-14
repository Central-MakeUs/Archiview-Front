'use client';

import { useQuery } from '@tanstack/react-query';
import { editorProfileGet } from '../api/editorProfile-get';
import { editorKeys } from '@/shared/lib/query-keys';

export const useEditorGetMyProfile = () => {
  return useQuery({
    queryKey: editorKeys.getEditorMeProfile.all.queryKey,
    queryFn: () => editorProfileGet.getEditorMeProfile(),
  });
};
