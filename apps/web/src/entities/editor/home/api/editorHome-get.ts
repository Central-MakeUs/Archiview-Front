import { EDITOR_ENDPOINTS } from '@/shared/constants/endpoints/editor/EditorEndpoints';
import { EditorInsightPlaceSort, IEditorHomeResponseDTO } from '../model/editorHome.type';
import { clientApi } from '@/shared/lib/api/client';

export const editorHomeGet = {
  getEditorHome: async (params: {
    sort?: EditorInsightPlaceSort;
  }): Promise<IEditorHomeResponseDTO> => {
    const response = await clientApi
      .get(EDITOR_ENDPOINTS.me.insights.places, {
        searchParams: { sort: params?.sort },
      })
      .json<IEditorHomeResponseDTO>();
    return response;
  },
};
