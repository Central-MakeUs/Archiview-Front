/**
 * @description 주소 값 타입
 * @example {
 *  placeName: '장소 이름',
 *  addressName: '주소',
 *  roadAddressName: '도로명 주소',
 *  latitude: 37.5665,
 *  longitude: 126.9780,
 *  placeUrl: 'https://www.instagram.com/test',
 *  phoneNumber: '010-1234-5678',
 */
export interface IAddressValues {
  placeName: string;
  addressName: string;
  roadAddressName: string;
  latitude: number;
  longitude: number;
  placeUrl: string;
  phoneNumber?: string;
}

/**
 * @description 장소 정보 타입
 * @example {
 *  placeName: '장소 이름',
 *  description: '장소 설명',
 *  addressName: '주소',
 *  roadAddressName: '도로명 주소',
 *  latitude: 37.5665,
 *  longitude: 126.9780,
 *  categoryIds: [1, 2],
 *  nearestStationWalkTime: '10분',
 *  placeUrl: 'https://www.instagram.com/test',
 *  phoneNumber: '010-1234-5678',
 *  imageUrl: 'https://www.instagram.com/test/image.jpg',
 * }
 */
export interface IRegisterPlaceCardValue extends IAddressValues {
  postPlaceId?: number;
  description: string;
  categoryIds: number[];
  nearestStationWalkTime: string;
  imageUrl: string;
}

/**
 * @description 장소 카드 타입
 * @param placeIndex 장소 인덱스
 */
export interface IRegisterPlaceCardProps {
  placeIndex?: number;
  value: IRegisterPlaceCardValue;
  onChange: (value: IRegisterPlaceCardValue) => void;
  error?: string;
}

/**
 * @description 인스타그램 URL 입력 타입
 * @example 'https://www.instagram.com/test'
 */
export interface IInstagramUrlInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

/**
 * @description 해시태그 입력 타입
 * @example ['#해시태그1', '#해시태그2', '#해시태그3']
 */
export interface IHashTagInputProps {
  className?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
}
