import { EditorTopBanner } from './EditorTopBanner';
import { EditorInsight } from './EditorInsight';
import { PopularPlaceSection } from './PopularPlaceSection';

export const EditorHomePage = () => {
  return (
    <div className="w-full">
      <EditorTopBanner />
      <EditorInsight />
      <p className="heading-20-bold pb-4 pl-5">반응이 좋은 장소</p>
      <PopularPlaceSection />
    </div>
  );
};
