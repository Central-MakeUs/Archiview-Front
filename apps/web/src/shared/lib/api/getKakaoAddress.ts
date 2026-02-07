export interface IAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_3depth_h_name: string;
  h_code: string;
  b_code: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
  x: string;
  y: string;
}

export interface IRoadAddress {
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  underground_yn: string;
  main_building_no: string;
  sub_building_no: string;
  building_name: string;
  zone_no: string;
  x: string;
  y: string;
}

export interface IKakaoAddress {
  address_name: string;
  address_type: string;
  x: string;
  y: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
}

export interface IKakaoAddressResponse {
  documents: IKakaoAddress[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
    same_name: {
      keyword: string;
      region: string[];
      selected_region: string;
    };
  };
}

export const getKakaoAddress = async (query: string) => {
  const response = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    },
  );
  return response.json() as Promise<IKakaoAddressResponse>;
};
