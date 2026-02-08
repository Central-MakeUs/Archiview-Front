import { clientApi } from '@/shared/lib/api/client';
import { EDITOR_ENDPOINTS } from '@/shared/constants/endpoints/editor/EditorEndpoints';
import {
  ICreateEditorPostRequest,
  ICreateEditorPostResponseDTO,
  IEditEditorPostRequest,
  IEditEditorPostResponseDTO,
  IEditorGetPresignedUrlResponseDTO,
  IGetEditorPresignedUrlRequest,
} from '../model/editorPlace.type';

export const editorPlacePost = {
  createEditorPost: async (
    body: ICreateEditorPostRequest,
  ): Promise<ICreateEditorPostResponseDTO> => {
    const response = await clientApi
      .post(EDITOR_ENDPOINTS.posts, { json: body })
      .json<ICreateEditorPostResponseDTO>();
    return response;
  },

  editPosts: async (
    postId: number,
    body: IEditEditorPostRequest,
  ): Promise<IEditEditorPostResponseDTO> => {
    const response = await clientApi
      .put(EDITOR_ENDPOINTS.me.postsDetail(postId), { json: body })
      .json<IEditEditorPostResponseDTO>();
    return response;
  },

  getPresignedUrl: async (
    body: IGetEditorPresignedUrlRequest,
  ): Promise<IEditorGetPresignedUrlResponseDTO> => {
    const response = await clientApi
      .post(EDITOR_ENDPOINTS.presignedUrl, { json: body })
      .json<IEditorGetPresignedUrlResponseDTO>();
    return response;
  },

  putImage: async (uploadUrl: string, file: File): Promise<void> => {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
    if (!response.ok) {
      throw new Error(`S3 upload failed: ${response.status}`);
    }
  },
};
