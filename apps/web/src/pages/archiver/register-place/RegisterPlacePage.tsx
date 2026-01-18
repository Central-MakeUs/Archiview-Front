import { InstagramUrlInput, HashTagInput } from './ui/RegisterPlaceInput';
import { RegisterPlaceCard } from './ui/RegisterPlaceCard';

export const RegisterPlacePage = () => {
  return (
    <div className="px-5">
      <InstagramUrlInput className="pt-2.5 pb-8" />
      <div className="-mx-5 border-b border-neutral-30" />
      <HashTagInput className="pt-4 pb-8" />
      <div className="-mx-5 border-b border-neutral-30" />
      <div className="-mx-5 bg-neutral-30">
        <div className="px-5">
          <RegisterPlaceCard />
        </div>
      </div>
    </div>
  );
};
