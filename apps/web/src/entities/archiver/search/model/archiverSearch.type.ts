import { ApiResponse } from '@/shared/lib/api/common';

export interface IKeyword {
  keyword: string;
  count: number;
  latestUsedAt: string;
}

export interface IRecommendationsResponse {
  totalCount: number;
  keywords: IKeyword[];
}

export interface IPlace {
  placeId: number;
  placeName: string;
  imageUrl: string;
  summary: string;
  addressName: string;
  roadAddressName: string;
  saveCount: number;
  viewCount: number;
  latestUpdatedAt: string;
}

export interface IEditor {
  editorId: string;
  nickname: string;
  instagramId: string;
  introduction: string;
  profileImageUrl: string;
  hashtags: string[];
  following: boolean;
  latestUpdatedAt: string;
}
export interface ISearchResponse {
  query: string;
  tab: string;
  placeCount: number;
  editorCount: number;
  hasMorePlaces: boolean;
  hasMoreEditors: boolean;
  places: IPlace[];
  editors: IEditor[];
}

export interface IHistory {
  historyId: number;
  keyword: string;
  displayKeyword: string;
  keywordType: string;
  searchedAt: string;
}

export interface IRecentResponse {
  totalCount: number;
  histories: IHistory[];
}

export type IRecommendationsResponseDTO = ApiResponse<IRecommendationsResponse>;
export type ISearchResponseDTO = ApiResponse<ISearchResponse>;
export type IRecentResponseDTO = ApiResponse<IRecentResponse>;
