import { IRegisterPlaceCardValue } from './place.types';

export const createPlaceDefault = (): IRegisterPlaceCardValue => ({
  placeName: '',
  description: '',
  addressName: '',
  roadAddressName: '',
  latitude: 0,
  longitude: 0,
  categoryIds: [],
  nearestStationWalkTime: '',
  placeUrl: '',
  phoneNumber: '',
  imageUrl: '',
});
