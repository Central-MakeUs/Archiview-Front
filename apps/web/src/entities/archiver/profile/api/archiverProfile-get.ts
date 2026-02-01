import { clientApi } from '@/shared/lib/api/client';
import { ARCHIVER_ENDPOINTS } from '@/shared/constants/endpoints/archiver/ArchiverEndpoints';

import type {
  IArchiverMyProfileResponseDTO,
  IArchiverProfileResponseDTO,
} from '../model/archiverProfile.type';

export const archiverProfileGet = {
  getMyProfile: async (): Promise<IArchiverMyProfileResponseDTO> => {
    const response = await clientApi
      .get(`${ARCHIVER_ENDPOINTS.me.profile}`)
      .json<IArchiverMyProfileResponseDTO>();
    return response;
  },

  getPublicProfile: async (archiverId: number): Promise<IArchiverProfileResponseDTO> => {
    const response = await clientApi
      .get(`${ARCHIVER_ENDPOINTS.publicProfile(archiverId)}`)
      .json<IArchiverProfileResponseDTO>();
    return response;
  },
};
