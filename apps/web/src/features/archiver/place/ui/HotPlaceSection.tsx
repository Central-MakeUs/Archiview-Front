import { HotPlaceCard } from '@/entities/archiver/place/ui/HotPlaceCard';
import { useGetHotPlace } from '@/entities/archiver/place/queries/useGetHotPlace';
import { IHotPlace } from '@/entities/archiver/place/model/archiverPlace.type';

export const HotPlaceSection = (): React.ReactElement => {
  const { data: hotPlaceData, isLoading, isError } = useGetHotPlace({ useMock: true });

  if (isLoading) return <div className="mb-5">로딩중...</div>;
  if (isError) return <div className="mb-5">에러</div>;
  console.log(hotPlaceData);
  const hotPlaces = hotPlaceData?.data?.places ?? [];

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
