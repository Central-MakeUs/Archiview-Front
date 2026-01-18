import { Button } from '@/shared/ui/button';
import { KakaoIcon } from '@/shared/ui/icon/KakaoIcon';

export const KakaoButton = () => {
  return (
    <Button startIcon={<KakaoIcon />} className="bg-[#FEE500] w-full">
      <span className="text-neutral-70">카카오톡으로 로그인</span>
    </Button>
  );
};
