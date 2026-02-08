import { ApiResponse } from '@/shared/lib/api/common';

export type EditorInsightPlaceSort =
  | 'RECENT'
  | 'MOST_VIEWED'
  | 'MOST_SAVED'
  | 'MOST_INSTAGRAM'
  | 'MOST_DIRECTIONS';

export interface IEditorHomePlaceStats {
  saveCount: number;
  viewCount: number;
  instagramInflowCount: number;
  directionCount: number;
}

export interface IEditorHomePlace {
  placeId: number;
  placeName: string;
  placeUrl: string;
  phoneNumber: string;
  placeImageUrl: string;
  editorSummary: string;
  stats: IEditorHomePlaceStats;
}

export interface IEditorHomePlace {
  sort: EditorInsightPlaceSort;
  places: IEditorHomePlace[];
}

export type IEditorHomeResponseDTO = ApiResponse<IEditorHomePlace>;
