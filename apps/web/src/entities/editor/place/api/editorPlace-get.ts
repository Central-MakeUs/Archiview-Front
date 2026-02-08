import { clientApi } from '@/shared/lib/api/client';
import { EDITOR_ENDPOINTS } from '@/shared/constants/endpoints/editor/EditorEndpoints';

import type {
  IEditorInsightPlaceListResponseDTO,
  IEditorInsightPlaceDetailResponseDTO,
  IEditorInsightResponseDTO,
  IEditorMyPlaceMapResponseDTO,
  IEditorMeUploadedPlaceListResponseDTO,
  InsightPeriod,
  EditorInsightPlaceSort,
} from '../model/editorPlace.type';

export type MapFilter = 'ALL' | 'NEARBY';

export const editorPlaceGet = {
  getInsightPlaceList: async (params: {
    sort?: EditorInsightPlaceSort;
    useMock?: boolean;
  }): Promise<IEditorInsightPlaceListResponseDTO> => {
    const response = await clientApi
      .get(`${EDITOR_ENDPOINTS.me.insights.places}`, {
        searchParams: { sort: params?.sort ?? 'RECENT', useMock: params?.useMock ?? false },
      })
      .json<IEditorInsightPlaceListResponseDTO>();
    return response;
  },

  getInsightPlaceDetail: async (params: {
    placeId: number;
    useMock?: boolean;
  }): Promise<IEditorInsightPlaceDetailResponseDTO> => {
    const response = await clientApi
      .get(`${EDITOR_ENDPOINTS.me.insights.places}`, {
        searchParams: { placeId: params?.placeId, useMock: params?.useMock ?? false },
      })
      .json<IEditorInsightPlaceDetailResponseDTO>();
    return response;
  },

  getInsightSummery: async (params: {
    period?: InsightPeriod;
    useMock?: boolean;
  }): Promise<IEditorInsightResponseDTO> => {
    const response = await clientApi
      .get(
        `${
          (EDITOR_ENDPOINTS.me.insights.summary,
          {
            searchParams: {
              period: params?.period ?? 'ALL',
              useMock: params?.useMock ?? false,
            },
          })
        }`,
      )
      .json<IEditorInsightResponseDTO>();
    return response;
  },

  getMyPlacePin: async (params?: {
    filter?: MapFilter;
    categoryIds?: number[];
    useMock?: boolean;
  }): Promise<IEditorMyPlaceMapResponseDTO> => {
    const sp = new URLSearchParams();

    sp.set('filter', params?.filter ?? 'ALL');
    sp.set('useMock', String(params?.useMock ?? false));

    (params?.categoryIds ?? []).forEach((id) => {
      sp.append('categoryIds', String(id));
    });
    const response = await clientApi
      .get(`${EDITOR_ENDPOINTS.me.map.places}`, {
        searchParams: sp,
      })
      .json<IEditorMyPlaceMapResponseDTO>();
    return response;
  },

  getDetailPlace: async (placeId: number): Promise<IEditorInsightPlaceDetailResponseDTO> => {
    const response = await clientApi
      .get(`${EDITOR_ENDPOINTS.me.placesDetail(placeId)}`)
      .json<IEditorInsightPlaceDetailResponseDTO>();
    return response;
  },

  getMyPlaceList: async (): Promise<IEditorMeUploadedPlaceListResponseDTO> => {
    const response = await clientApi
      .get(`${EDITOR_ENDPOINTS.me.places}`)
      .json<IEditorMeUploadedPlaceListResponseDTO>();
    return response;
  },
};
