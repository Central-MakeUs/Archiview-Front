import { clientApi } from '@/shared/lib/api/client';
import { EDITOR_ENDPOINTS } from '@/shared/constants/endpoints/editor/EditorEndpoints';

import type {
  IEditorInsightPlaceListResponseDTO,
  IEditorInsightPlaceDetailResponseDTO,
  IEditorInsightResponseDTO,
  IEditorMyPlacePinResponseDTO,
  IEditorMeUploadedPlaceListResponseDTO,
  InsightPeriod,
  EditorInsightPlaceSort,
  IEditorPostByPlaceResponseDTO,
} from '../model/editorPlace.type';

export type MapFilter = 'ALL' | 'NEARBY';
export type MyPlaceSort = 'UPDATED' | 'CREATED';

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
      .get(`${EDITOR_ENDPOINTS.me.insights.places}`, {
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
    categoryId?: number;
    latitude?: number;
    longitude?: number;
    useMock?: boolean;
  }): Promise<IEditorMyPlacePinResponseDTO> => {
    const filter = params?.filter ?? 'ALL';
    const searchParams = new URLSearchParams();

    searchParams.set('filter', filter);
    searchParams.set('useMock', String(params?.useMock ?? false));

    if (Number.isFinite(params?.categoryId)) {
      searchParams.set('categoryId', String(params?.categoryId));
    }

    if (filter === 'NEARBY') {
      if (Number.isFinite(params?.latitude)) {
        searchParams.set('latitude', String(params?.latitude));
      }

      if (Number.isFinite(params?.longitude)) {
        searchParams.set('longitude', String(params?.longitude));
      }
    }

    const response = await clientApi
      .get(`${EDITOR_ENDPOINTS.me.map.places}`, {
        searchParams,
      })
      .json<IEditorMyPlacePinResponseDTO>();
    return response;
  },

  getDetailPlace: async (placeId: number): Promise<IEditorInsightPlaceDetailResponseDTO> => {
    const response = await clientApi
      .get(`${EDITOR_ENDPOINTS.me.placesDetail(placeId)}`)
      .json<IEditorInsightPlaceDetailResponseDTO>();
    return response;
  },

  // 내가 업로드한 장소 목록 조회
  getMyPlaceList: async (params?: {
    filter?: MapFilter;
    sort?: MyPlaceSort;
    categoryId?: number;
    latitude?: number;
    longitude?: number;
    useMock?: boolean;
  }): Promise<IEditorMeUploadedPlaceListResponseDTO> => {
    const filter = params?.filter ?? 'ALL';
    const searchParams = new URLSearchParams();

    searchParams.set('filter', filter);
    searchParams.set('sort', params?.sort ?? 'UPDATED');
    searchParams.set('useMock', String(params?.useMock ?? false));

    if (Number.isFinite(params?.categoryId)) {
      searchParams.set('categoryId', String(params?.categoryId));
    }

    if (filter === 'NEARBY') {
      if (Number.isFinite(params?.latitude)) {
        searchParams.set('latitude', String(params?.latitude));
      }

      if (Number.isFinite(params?.longitude)) {
        searchParams.set('longitude', String(params?.longitude));
      }
    }

    const response = await clientApi
      .get(`editors/me/places`, {
        searchParams,
      })
      .json<IEditorMeUploadedPlaceListResponseDTO>();
    return response;
  },

  getMyPlaceDetail: async (placeId: number): Promise<IEditorInsightPlaceDetailResponseDTO> => {
    const response = await clientApi
      .get(`${EDITOR_ENDPOINTS.me.placesDetail(placeId)}`)
      .json<IEditorInsightPlaceDetailResponseDTO>();
    return response;
  },

  getPostByPlace: async (postPlaceId: number): Promise<IEditorPostByPlaceResponseDTO> => {
    const response = await clientApi
      .get(`${EDITOR_ENDPOINTS.me.posts.byPostPlace(postPlaceId)}`)
      .json<IEditorPostByPlaceResponseDTO>();
    return response;
  },
};
