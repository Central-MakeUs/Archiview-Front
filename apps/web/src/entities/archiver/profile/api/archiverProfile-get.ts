import { clientApi } from '@/shared/lib/api/client';
import { ARCHIVER_ENDPOINTS } from '@/shared/constants/endpoints/archiver/ArchiverEndpoints';

import type {
  IArchiverMyProfileResponseDTO,
  IEditorsTrustedResponseDTO,
  IMyFollowsResponseDTO,
  IEditorProfileResponseDTO,
  IEditorPlaceResposneDTO,
  IEditorPlacePinsResponseDTO,
} from '../model/archiverProfile.type';

export const archiverProfileGet = {
  // 내 프로필
  getMyProfile: async (params: { useMock?: boolean }): Promise<IArchiverMyProfileResponseDTO> => {
    const response = await clientApi
      .get(`${ARCHIVER_ENDPOINTS.me.profile}`, {
        searchParams: { useMock: params?.useMock ?? false },
      })
      .json<IArchiverMyProfileResponseDTO>();
    return response;
  },

  // 믿고 먹는 에디터
  getEditorsTrusted: async (params: { useMock?: boolean }): Promise<IEditorsTrustedResponseDTO> => {
    const response = await clientApi
      .get(`${ARCHIVER_ENDPOINTS.editors.trusted}`, {
        searchParams: { useMock: params?.useMock ?? false },
      })
      .json<IEditorsTrustedResponseDTO>();
    return response;
  },

  // 내가 팔로잉하는 목록
  getMyFollows: async (params: { useMock?: boolean }): Promise<IMyFollowsResponseDTO> => {
    const response = await clientApi
      .get(`${ARCHIVER_ENDPOINTS.follows}`, {
        searchParams: { useMock: params?.useMock ?? false },
      })
      .json<IMyFollowsResponseDTO>();
    return response;
  },

  getEditorProfile: async (params: {
    editorId: string;
    useMock?: boolean;
  }): Promise<IEditorProfileResponseDTO> => {
    const response = await clientApi
      .get(`archivers/editors/${params.editorId}/profile`, {
        searchParams: { useMock: params?.useMock ?? false },
      })
      .json<IEditorProfileResponseDTO>();
    return response;
  },

  // 에디터가 업로드한 장소 목록 조회
  getEditorPlaceList: async (params: {
    userId: string;
    sort?: 'LATEST' | 'OLDEST';
    useMock?: boolean;
  }): Promise<IEditorPlaceResposneDTO> => {
    const response = await clientApi
      .get(`archivers/editors/${params.userId}/post-places`, {
        searchParams: { sort: params?.sort ?? 'LATEST', useMock: params?.useMock ?? false },
      })
      .json<IEditorPlaceResposneDTO>();
    return response;
  },

  // 에디터 업로드 장소 핀 지도 조회
  getEditorPlacePins: async (params: {
    editorId: string;
    filter?: 'ALL' | 'NEARBY';
    categoryId?: number;
    latitude?: number;
    longitude?: number;
    useMock?: boolean;
  }): Promise<IEditorPlacePinsResponseDTO> => {
    const filter = params?.filter ?? 'ALL';
    const searchParams = new URLSearchParams();

    searchParams.set('filter', filter);
    searchParams.set('useMock', String(params?.useMock ?? false));

    if (Number.isFinite(params?.categoryId)) {
      searchParams.set('categoryId', String(params.categoryId));
    }

    if (filter === 'NEARBY') {
      if (Number.isFinite(params?.latitude)) {
        searchParams.set('latitude', String(params.latitude));
      }

      if (Number.isFinite(params?.longitude)) {
        searchParams.set('longitude', String(params.longitude));
      }
    }

    const response = await clientApi
      .get(`archivers/editors/${params.editorId}/map/places`, {
        searchParams,
      })
      .json<IEditorPlacePinsResponseDTO>();
    return response;
  },
};
