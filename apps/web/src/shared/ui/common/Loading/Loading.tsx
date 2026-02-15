import { SyncLoader } from 'react-spinners';
import { BlueFolderIcon } from '../../icon';

interface ILoadingProps {
  text: string;
  role: 'EDITOR' | 'ARCHIVER';
}

export const Loading = ({ text, role }: ILoadingProps) => {
  const roleLabel = role === 'EDITOR' ? '에디터' : '아카이버';

  return (
    <div className="flex h-full w-full items-center justify-center p-20">
      <div className="flex w-full flex-col items-center gap-7 rounded-[20px] bg-neutral-10 px-5 py-9">
        <BlueFolderIcon className="h-11 w-11" />
        <div className="flex w-full flex-col items-center gap-7">
          <div className="flex w-full flex-col items-center gap-1">
            <p className="body-16-bold text-center text-neutral-90">
              {text}
              {/* <br />
              {roleLabel} 화면으로 이동 중 */}
            </p>
            <p className="caption-12-semibold text-neutral-40">조금만 기다려주세요</p>
          </div>

          <SyncLoader speedMultiplier={0.5} color="#359EFA" size={8} margin={6} />
        </div>
      </div>
    </div>
  );
};
