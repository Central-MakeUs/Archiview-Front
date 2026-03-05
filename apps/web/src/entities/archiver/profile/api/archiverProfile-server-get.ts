import 'server-only';

import { serverApi } from '@/shared/lib/api/server';
import { ARCHIVER_ENDPOINTS } from '@/shared/constants/endpoints/archiver/ArchiverEndpoints';

import type {
  IArchiverMyProfileResponseDTO,
  IEditorsTrustedResponseDTO,
} from '../model/archiverProfile.type';

export const archiverProfileServerGet = {
  getMyProfile: async (params: {
    useMock?: boolean;
  }): Promise<IArchiverMyProfileResponseDTO> => {
    const response = await serverApi.get<IArchiverMyProfileResponseDTO>(
      ARCHIVER_ENDPOINTS.me.profile,
      { searchParams: { useMock: params?.useMock ?? false } },
    );
    return response;
  },

  getEditorsTrusted: async (params: {
    useMock?: boolean;
  }): Promise<IEditorsTrustedResponseDTO> => {
    const response = await serverApi.get<IEditorsTrustedResponseDTO>(
      ARCHIVER_ENDPOINTS.editors.trusted,
      { searchParams: { useMock: params?.useMock ?? false } },
    );
    return response;
  },
};
