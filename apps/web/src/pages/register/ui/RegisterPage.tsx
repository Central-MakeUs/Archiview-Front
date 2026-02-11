import { RoleSelectSection } from './RoleSelectSection';

export const RegisterPage = () => {
  return (
    <div className="px-5 h-full flex flex-col">
      <div className="flex flex-col gap-2 pt-7">
        <h1 className="heading-24-semibold">어떤 방식으로 사용할까요?</h1>
        <h2 className="body-16-semibold text-neutral-40">나중에 언제든 변경할 수 있어요</h2>
      </div>
      <RoleSelectSection />
    </div>
  );
};
