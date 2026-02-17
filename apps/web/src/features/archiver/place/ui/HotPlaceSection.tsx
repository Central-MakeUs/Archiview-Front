import { HotPlaceCard } from '@/entities/archiver/place/ui/HotPlaceCard';
import { IHotPlace } from '@/entities/archiver/place/model/archiverPlace.type';

interface IHotPlaceSectionProps {
  hotPlaces: IHotPlace[];
}

export const HotPlaceSection = ({ hotPlaces }: IHotPlaceSectionProps): React.ReactElement => {
  if (hotPlaces.length === 0) {
    return (
      <section className="mb-5">
        <div className="flex justify-between mb-4">
          <span className="heading-20-bold">요즘 HOT한 장소</span>
        </div>
        <div>표시할 장소가 없습니다.</div>
      </section>
    );
  }

  return (
    <section className="mb-5">
      <div className="flex justify-between mb-4">
        <span className="heading-20-bold">요즘 HOT한 장소</span>
      </div>
      <div className="flex overflow-x-scroll gap-3 scroll-none">
        {hotPlaces.map((place: IHotPlace) => (
          <HotPlaceCard
            key={place.placeId}
            placeId={place.placeId}
            imageUrl={place.imageUrl}
            name={place.name}
            address={place.address}
            categoryNames={place.categoryNames ?? []}
            hashTags={place.hashTags ?? []}
          />
        ))}
      </div>
    </section>
  );
};
