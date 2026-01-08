import * as React from 'react';
import { PencilIcon } from '@/shared/components/icon';
import { Card } from './common/Card';

interface IPlaceListCardProps {
  image: React.ReactNode;
  title: string;
  description: string;
  uploadedAt: string;
  selected?: boolean;
  onEdit?: () => void;
}

export const PlaceListCard = ({
  image,
  title,
  description,
  uploadedAt,
  selected,
  onEdit,
}: IPlaceListCardProps): React.ReactElement => {
  return (
    <Card thumbnail={image} selected={selected}>
      <div className="flex w-full items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate body-14-bold">{title}</div>
          <div className="truncate text-sm text-gray-500">{description}</div>
          <div className="mt-1 text-xs text-gray-400">{uploadedAt}</div>
        </div>

        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="shrink-0 text-gray-400 hover:text-gray-600"
          >
            <PencilIcon />
          </button>
        )}
      </div>
    </Card>
  );
};
