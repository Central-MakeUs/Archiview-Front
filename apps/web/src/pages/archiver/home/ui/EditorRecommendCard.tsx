import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/shared/ui/Badge';
import { Card } from '@/shared/ui/common/Card';

interface IEditorRecommendCardProps {
  imageUrl: string;
  title: string;
  address: string;
}

export const EditorRecommendCard = ({ imageUrl, title, address }: IEditorRecommendCardProps) => {
  return (
    // TODO : 라우팅 연결하기
    <Link href={`/`} className="block shrink-0">
      <Card className="shrink-0 h-52 w-46 shadow-default overflow-hidden border-none">
        <div>
          <Image src={imageUrl} alt="" width={182} height={90} />
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <span className="body-14-semibold">{title}</span>
          </div>
          <div className="caption-12-regular text-neutral-50 mb-3">{address}</div>
          <div className="flex items-center gap-1">
            <span>
              <Badge variant="contained" className="rounded-xl bg-primary-40">
                카테고리
              </Badge>
            </span>
            <span>
              <Badge variant="contained" className="rounded-xl bg-primary-10 text-primary-40">
                사용자 지정
              </Badge>
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
