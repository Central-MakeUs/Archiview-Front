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
  // 에디터 인사이트 장소 목록 조회
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

  // 에디터 장소 상세 조회
  getInsightPlaceDetail: async (params: {
    placeId: number;
    useMock?: boolean;
  }): Promise<IEditorInsightPlaceDetailResponseDTO> => {
    const response = await clientApi
      .get(`${EDITOR_ENDPOINTS.me.insights.placesDetail}`, {
        searchParams: { placeId: params?.placeId, useMock: params?.useMock ?? false },
      })
      .json<IEditorInsightPlaceDetailResponseDTO>();
    return response;
  },

  // 에디터 인사이트 요약 조회
  getInsightSummery: async (params: {
    period?: InsightPeriod;
    useMock?: boolean;
  }): Promise<IEditorInsightResponseDTO> => {
    const response = await clientApi
      .get(`${EDITOR_ENDPOINTS.me.insights.summary}`, {
        searchParams: {
          period: params?.period ?? 'ALL',
          useMock: params?.useMock ?? false,
        },
      })
      .json<IEditorInsightResponseDTO>();
    return response;
  },

  // 내 장소 지도 핀 조회
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

  // 내가 업로드한 장소 목록 조회
  getMyPlaceList: async (params?: {
    useMock?: boolean;
  }): Promise<IEditorMeUploadedPlaceListResponseDTO> => {
    const response = await clientApi
      .get(`${EDITOR_ENDPOINTS.me.places}`, {
        searchParams: { useMock: params?.useMock ?? false },
      })
      .json<IEditorMeUploadedPlaceListResponseDTO>();
    return response;
  },
};
