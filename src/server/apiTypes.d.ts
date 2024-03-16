export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export interface IRSuccess<T = Recordable> {
  success: boolean;
  statusCode: number;
  data: T;
  message?: string;
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
  id: number;
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
  id: number;
  name?: string;
  icon?: null | string;
  code?: string;
  domain?: string;
  hotel_id?: number;
}

export interface IFloor {
  _id: string;
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

interface IMediasClass {
  configs?: { [key: string]: IConfig };
  avatar?: IAvatar;
}

interface IAvatar {
  fileName?: string;
  path?: string;
}

interface IConfig {
  position?: number[];
}

export interface IRoom {
  _id: string;
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

export type TTrait = 'Brightness' | 'ColdWarmColor' | 'OnOff';

interface ITrait {
  name?: TTrait;
  is_main?: boolean;
  min?: number;
  max?: number;
}

export interface IStates {
  Brightness?: Brightness;
  ColdWarmColor?: ColdWarmColor;
  OnOff?: OnOff;
  HCL?: HCL;
}

interface Brightness {
  brightness?: number;
}

interface ColdWarmColor {
  coldWarmColor?: number;
}

interface HCL {
  active?: boolean;
  hclid?: string;
  mode?: number;
}

interface OnOff {
  on?: boolean;
}

interface IDeviceStatus {
  _id?: string;
  devid?: string;
  hotel_id?: number;
  status?: number;
  states?: IStates;
  errors?: any[];
  is_sync?: number;
}

interface Meta {
  rule_key_card?: string | null;
  rule_maintenance_group?: string | null;
}

export type TDeviceType = 'LIGHT';

export interface IDevice {
  _id: string;
  hotel_id?: number;
  floor_id?: string;
  floor_name?: string;
  map_model_type?: string;
  map_model_type_name?: null;
  room_id?: string;
  room_name?: string;
  device_type_id?: string;
  device_type_name?: string;
  devid?: string;
  device_status?: IDeviceStatus | null;
  name?: string;
  icon?: string;
  description?: string;
  medias?: any[];
  traits?: ITrait[];
  bridge_id?: string;
  attr?: any[];
  meta?: Meta;
  security_level?: string;
  security_level_name?: string;
  type?: TDeviceType;
  thing_lrn?: string;
  created_at?: number;
  updated_at?: number;
}

export interface IPagination {
  totalCount?: number;
  pageCount?: number;
  currentPage?: number;
  perPage?: number;
}

interface INext {
  id?: null;
  run_time?: null;
  name?: null;
}

export interface ISchedule {
  next?: Next;
  last?: any[];
}

export interface IPayload {
  cmd: 'set';
  reqid: number;
  objects?: IObject[];
}

interface IObject {
  type: 'devices';
  data: string[];
  execution?: IExecution[];
}

interface IExecution {
  command?: string;
  params?: OnOff;
}
