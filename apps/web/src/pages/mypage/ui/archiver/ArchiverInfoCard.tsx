import React from 'react';

interface IArchiverInfoCardProps {
  nickname: string;
  code?: string;
}

export const ArchiverInfoCard = ({
  nickname,
  code = '#0000',
}: IArchiverInfoCardProps): React.ReactElement => {
  return (
    <div className="flex items-center rounded-default bg-primary-30 p-5">
      <div className="flex flex-1 flex-col">
        <span className="heading-20-semibold">
          <span className="text-neutral-90">{nickname} </span>
          <span className="text-neutral-40">{code}</span>
        </span>
      </div>
    </div>
  );
};
