import { Loading } from './Loading';

interface ILoadingPageProps {
  text: string;
  role: 'EDITOR' | 'ARCHIVER';
}
export const LoadingPage = ({ text, role }: ILoadingPageProps) => {
  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center">
      <Loading text={text} role={role} />
    </div>
  );
};
