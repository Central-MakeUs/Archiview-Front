import { EditorProfilePageInner } from './EditorProfilePageInner';

export type CategoryTab =
  | 'ALL'
  | 'NEAR'
  | 'KOREAN'
  | 'WESTERN'
  | 'JAPANESE'
  | 'IZAKAYA'
  | 'CAFE'
  | 'DATE'
  | 'ETC';

interface IPlace {
  id: string;
  title: string;
  description: string;
  lat: number;
  lng: number;
  savedCount: number;
  viewCount: number;
  shareCount: number;
  instagramCount: number;
  category: CategoryTab;
}

export const EditorProfilePage = () => {
  // 목데이터
  const initialPlaces: IPlace[] = [
    {
      id: '1',
      title: '장소1',
      lat: 37.5665,
      lng: 126.978,
      description:
        '가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명',
      category: 'CAFE',
      savedCount: 12,
      viewCount: 345,
      shareCount: 67,
      instagramCount: 8,
    },
    {
      id: '2',
      title: '장소1',
      lat: 37.5665,
      lng: 126.978,
      description:
        '가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명',
      category: 'CAFE',
      savedCount: 12,
      viewCount: 345,
      shareCount: 67,
      instagramCount: 8,
    },
    {
      id: '3',
      title: '장소1',
      lat: 37.5665,
      lng: 126.978,
      description:
        '가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명가게설명',
      category: 'CAFE',
      savedCount: 12,
      viewCount: 345,
      shareCount: 67,
      instagramCount: 8,
    },
    // ...
  ];

  return <EditorProfilePageInner initialPlaces={initialPlaces} />;
};
