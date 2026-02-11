import { useMutation } from '@tanstack/react-query';

import { editorProfilePost } from '@/entities/editor/profile/api/editorProfile-post';
import type { IEditorProfileRegisterRequest } from '@/entities/auth/model/auth.type';

export const useRegisterEditorProfile = () => {
  return useMutation({
    mutationFn: (payload: IEditorProfileRegisterRequest) => editorProfilePost.registerEditorProfile(payload),
  });
};
