export interface IRSuccess<T = Recordable> {
  success: boolean;
  statusCode: number;
  data: T;
}

export interface IRPagination<T = any> {
  items: T[];
  total: number;
}

export interface IRError {
  success: boolean;
  statusCode: number;
  data?: any;
  message?: string;
  errors?: string[];
}

export interface IHotel {
  id?: number;
  name?: string;
  code?: string;
  description?: string;
  medias?: any[];
  status?: number;
  customer_id?: number;
  is_deleted?: number;
  created_at?: number;
  updated_at?: number;
  domain?: string;
  ip_local?: string;
  url_api_local?: string;
  floors?: IFloor[];
  deviceType?: IDeviceType[];
}

export interface IDeviceType {
  id?: number;
  name?: string;
  icon?: null | string;
  code?: string;
  domain?: string;
  hotel_id?: number;
}

export interface IFloor {
  _id?: string;
  name?: string;
  icon?: string;
  description?: string;
  order?: number;
  hotel_id?: number;
  type?: number;
  created_at?: number;
  updated_at?: number;
  is_deleted?: number;
  domain?: string;
  medias?: any[] | IMediasClass;
  rooms?: IRoom[];
}

export interface IMediasClass {
  configs?: { [key: string]: IConfig };
  avatar?: IAvatar;
}

export interface IAvatar {
  fileName?: string;
  path?: string;
}

export interface IConfig {
  position?: number[];
}

export interface IRoom {
  _id?: string;
  name?: string;
  description?: string;
  order?: number;
  hotel_id?: number;
  floor_id?: string;
  created_at?: number;
  updated_at?: number;
  is_deleted?: number;
  domain?: string;
}

export interface IUserInfo {
  id: number;
  name?: string;
  email: string;
  phone?: string;
  auth_key?: null;
  status?: number;
  customer_id?: number;
  is_deleted?: number;
  verify_email?: number;
  verify_phone?: number;
  created_at: number;
  updated_at: number;
  domain?: string;
  syn_operator?: number;
  current_role?: number;
  current_role_name?: number;
  roles?: any[];
}
