import type { ExtendedKyHttpError } from '@/shared/lib/api/common';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { archiverReportPost } from '../api/archiverReport-post';
import type { IReportPostPlaceResponseDTO } from '../model/archiverReport.type';

interface IUseReportPostPlaceOptions {
  onSuccess?: (data: IReportPostPlaceResponseDTO) => void;
}

export const useReportPostPlace = (options?: IUseReportPostPlaceOptions) => {
  const { mutate: reportPostPlace } = useMutation({
    mutationFn: archiverReportPost.reportPostPlace,
    onSuccess: (data: IReportPostPlaceResponseDTO) => {
      toast.success('신고가 접수되었습니다.');
      options?.onSuccess?.(data);
    },
    onError: (error: ExtendedKyHttpError) => {
      const message = error.errorData?.message ?? error.message ?? '알 수 없는 오류';
      toast.error(message);
    },
  });

  return { reportPostPlace };
};
