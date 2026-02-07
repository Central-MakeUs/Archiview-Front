import { clientApi } from '@/shared/lib/api/client';
import { EDITOR_ENDPOINTS } from '@/shared/constants/endpoints/editor/EditorEndpoints';
import { ICreateEditorPostRequest, ICreateEditorPostResponseDTO } from '../model/editorPlace.type';

export const editorPlacePost = {
  createEditorPost: async (
    body: ICreateEditorPostRequest,
  ): Promise<ICreateEditorPostResponseDTO> => {
    const response = await clientApi
      .post(EDITOR_ENDPOINTS.posts, { json: body })
      .json<ICreateEditorPostResponseDTO>();
    return response;
  },
};
