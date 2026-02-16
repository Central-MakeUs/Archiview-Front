import { TrialPageInner } from './TrialPageInner';
import type { CategoryTab } from '@/pages/editor/profile/CategoryOptionTabs';

interface IPlace {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  lat: number;
  lng: number;
  savedCount: number;
  viewCount: number;
  category: CategoryTab;
}

export const TrialPage = () => {
  const initialPlaces: IPlace[] = [
    {
      id: '1',
      title: '장소1',
      thumbnail: '/images/ExampleImage.png',
      lat: 37.5665,
      lng: 126.978,
      description:
        '가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명',
      category: '카페',
      savedCount: 12,
      viewCount: 345,
    },
    {
      id: '2',
      title: '장소1',
      thumbnail: '/images/ExampleImage.png',
      lat: 37.5665,
      lng: 126.978,
      description:
        '가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명',
      category: '카페',
      savedCount: 12,
      viewCount: 345,
    },
    {
      id: '3',
      title: '장소1',
      thumbnail: '/images/ExampleImage.png',
      lat: 37.5665,
      lng: 126.978,
      description:
        '가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명',
      category: '카페',
      savedCount: 12,
      viewCount: 345,
    },
    // ...
  ];
  return <TrialPageInner initialPlaces={initialPlaces} />;
};
