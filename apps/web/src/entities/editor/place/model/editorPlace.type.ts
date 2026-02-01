import { ApiResponse } from '@/shared/lib/api/common';

export type EditorInsightPlaceSort =
  | 'RECENT'
  | 'MOST_VIEWED'
  | 'MOST_SAVED'
  | 'MOST_INSTAGRAM'
  | 'MOST_DIRECTIONS';

export type InsightPeriod = 'ALL' | 'MONTH' | 'WEEK';

export interface IEditorInsightPlace {
  placeId: number;
  placeName: string;
  placeImageUrl: string;
  editorSummary: string;
  stats: {
    saveCount: number;
    viewCount: number;
    instagramInflowCount: number;
    directionCount: number;
  };
}

export interface IEditorInsightPlaceList {
  sort: EditorInsightPlaceSort;
  places: IEditorInsightPlace[];
}

export interface IEditorInsightPlaceDetail {
  placeId: number;
  placeName: string;
  placeImageUrl: string;
  editorTotal: number;
  address: {
    roadAddress: string;
    detailAddress: string;
    zipCode: string;
  };
  nearestStationWalkTime: string;
  stats: {
    saveCount: number;
    viewCount: number;
    instagramInflowCount: number;
    directionCount: number;
  };
  postPlaces: [
    {
      editorName: string;
      editorInstagramId: string;
      postUrl: string;
      postHashTag: string;
      description: string;
      categories: string[];
    },
  ];
}

export interface IPlaceInfo {
  placeId: number;
  name: string;
  roadAddress: string;
  detailAddress: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

export interface IEditorInsight {
  editorNickname: string;
  totalPlaceCount: number;
  period: InsightPeriod;
  instagramInflowCount: number;
  saveCount: number;
  viewCount: number;
}

export interface IEditorMyPlaceMapResponse {
  postId: number;
  url: string;
  hashTag: string;
  placeInfoResponseList: IPlaceInfo[];
}

export interface IEditorMeUploadedPlaceList {
  places: IEditorInsightPlace[];
}

// 에디터 인사이트 장소 목록 조회
export type IEditorInsightPlaceListResponseDTO = ApiResponse<IEditorInsightPlaceList>;

// 에디터 장소 상세 조회
export type IEditorInsightPlaceDetailResponseDTO = ApiResponse<IEditorInsightPlaceDetail>;

// 에디터 인사이트 요약 조회
export type IEditorInsightResponseDTO = ApiResponse<IEditorInsight>;

// 에디터 내 장소 핀 조회
export type IEditorMyPlaceMapResponseDTO = ApiResponse<IEditorMyPlaceMapResponse>;

// 에디터 내가 업로드한 장소 목록 조회
export type IEditorMeUploadedPlaceListResponseDTO = ApiResponse<IEditorMeUploadedPlaceList>;
