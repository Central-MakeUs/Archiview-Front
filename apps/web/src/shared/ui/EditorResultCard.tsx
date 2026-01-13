import * as React from 'react';
import { CardWrapper } from './common/CardWrapper';
import { RightArrowIcon, FolderIcon, EyeIcon } from './icon';

interface IEditorResultCardProps {
  image: React.ReactNode;
  title: string;
  description: string;
  uploadedAt: string;
  views: number;
  saves: number;
  selected?: boolean;
  onClick?: () => void;
}

export const EditorResultCard = ({
  image,
  title,
  description,
  uploadedAt,
  views,
  saves,
  selected,
  onClick,
}: IEditorResultCardProps): React.ReactElement => {
  return (
    <CardWrapper thumbnail={image} selected={selected}>
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <div className="min-w-0">
          <div className="truncate font-semibold text-gray-900">{title}</div>
          <div className="truncate text-sm text-gray-500">{description}</div>

          <div className="mt-1 flex gap-3 text-xs text-gray-400">
            <span>{uploadedAt}</span>
            <span className="text-primary-20">
              <EyeIcon /> {views}
            </span>
            <span className="text-primary-20">
              <FolderIcon /> {saves}
            </span>
          </div>
        </div>

        <RightArrowIcon className="shrink-0 text-gray-400" />
      </button>
    </CardWrapper>
  );
};
