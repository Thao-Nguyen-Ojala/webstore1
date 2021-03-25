export interface resgisterFormType {
  email: string,
  password: string,
  retypePassword?: string;
  fullName: string,
  username?: string;
}

export interface logInFormType {
  email?: string,
  password: string,
  username?: string;
}

export interface UserState {
  current:  { 
    email: string,
    fullName: string,
    id: number,
    username: string
  },
  settings: {}
}

export interface UserLoggedOut {
  current: undefined
}

export interface PaginationParams {
  _page?: number,
  _limit?: number,
  _start?: number
}

export interface PaginationType {
  limit: number,
  page: number,
  total: number
}

export interface ProductListResponse {
  data: {data: ProductListType[]},
  pagination: PaginationType
}

export interface ProductListType {
    category: {},
    description: string,
    id: number,
    isFreeShip: boolean,
    isPromotion: boolean,
    name: string,
    promotionPercent: number,
    salePrice: number,
    shortDescription: string,
    thumbnail: {
      url: string | null
    },
    title: string,
}


export interface priceRangeValuesType {
  salePrice_gte: number;
  salePrice_lte: number;
}

export interface serviceValuesType {
  isPromotion: boolean,
  isFreeShip: boolean,
}