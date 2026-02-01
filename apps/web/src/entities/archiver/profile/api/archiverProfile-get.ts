import { clientApi } from '@/shared/lib/api/client';
import { ARCHIVER_ENDPOINTS } from '@/shared/constants/endpoints/archiver/ArchiverEndpoints';

import type {
  IMyProfileResponseDTO,
  IArchiverProfileResponseDTO,
} from '../model/archiverProfile.type';

export const archiverProfileGet = {
  getMyProfile: async (): Promise<IMyProfileResponseDTO> => {
    const response = await clientApi
      .get(`${ARCHIVER_ENDPOINTS.me.profile}`)
      .json<IMyProfileResponseDTO>();
    return response;
  },

  getPublicProfile: async (archiverId: number): Promise<IArchiverProfileResponseDTO> => {
    const response = await clientApi
      .get(`${ARCHIVER_ENDPOINTS.publicProfile(archiverId)}`)
      .json<IArchiverProfileResponseDTO>();
    return response;
  },
};
