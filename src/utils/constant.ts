import type { TreeDataNode } from 'antd';

export enum APIs {
  ROUTE_LIST = '/mock_api/getRoute',
  LOGIN = '/site/login',
  GET_USER_INFO = '/mock_api/getUserInfo',
  GET_PERM_CODE = '/mock_api/getPermCode',
  LOGOUT = '/site/logout',
  GET_TODOS = '/mock_api/todos',
  FORGOT_PASSWORD = '/site/request-password-reset',
  VERIFY = '/site/verify-password-reset',
  GET_HOTELS = '/hotel',
  GET_DEVICES = '/device',
}
export type TIconType =
  | 'air-conditioner'
  | 'light-bulb'
  | 'fan'
  | 'camera'
  | 'pump'
  | 'smart-meter'
  | 'temperature'
  | 'locales'
  | 'moon'
  | 'sun'
  | 'bulb'
  | 'calendar'
  | 'gift'
  | 'medal'
  | 'moon'
  | 'rocket'
  | 'star'
  | 'sun'
  | 'trophy'
  | 'umbrella';
export interface IListIconItem {
  id: number;
  name: string;
  name_en: string;
  type: TIconType;
}

export const ListIconVariant: IconVariant[] = [
  'bulb',
  'calendar',
  'rocket',
  'star',
  'sun',
  'moon',
  'trophy',
  'umbrella',
  'medal',
  'gift',
];

export const ListIconImage: IListIconItem[] = [
  {
    id: 1,
    name: 'Bóng đèn',
    name_en: 'Light',
    type: 'light-bulb',
  },
  {
    id: 2,
    name: 'Quạt',
    name_en: 'Fan',
    type: 'fan',
  },
  {
    id: 3,
    name: 'Điều hòa',
    name_en: 'Air conditioner',
    type: 'air-conditioner',
  },
  {
    id: 4,
    name: 'Camera',
    name_en: 'Camera',
    type: 'camera',
  },
  {
    id: 5,
    name: 'Máy bơm',
    name_en: 'Pump',
    type: 'pump',
  },
  {
    id: 6,
    name: 'Máy đo',
    name_en: 'Meter',
    type: 'smart-meter',
  },
  {
    id: 7,
    name: 'Nhiệt độ',
    name_en: 'Temperature',
    type: 'temperature',
  },
];

export const IconTemplate = {
  sun: 'sun',
  moon: 'moon',
  umbrella: 'umbrella',
  medal: 'medal',
  gift: 'gift',
  rocket: 'rocket',
  trophy: 'trophy',
  calendar: 'calendar',
  bulb: 'bulb',
  star: 'star',
};

export type IconVariant = keyof typeof IconTemplate;

export const FAKE_DATA: {
  devicesList: { items: IDevicesListItem[] };
  sectionList: { items: ISectionListItem[] };
} = {
  devicesList: {
    items: [
      {
        id: 24,
        name: 'A20.01',
        description: null,
        handover: null,
        medias: null,
        status: 0,
        status_name: 'Chưa ở',
        capacity: 75,
        building_area: { id: 17, name: 'A30' },
        resident_user: { id: '', phone: '', first_name: '', last_name: '' },
        resident_user_name: '',
        parent_path: 'A30',
        code: 'EBZLV9',
        date_received: null,
        date_delivery: 1670723410,
        set_water_level: 1,
        total_members: 1,
        form_type: 11,
        form_type_name: 'Villa The Symphony',
        form_type_name_en: 'Villa The Symphony',
        created_at: 1709689811,
        updated_at: 1709689811,
      },
      {
        id: 23,
        name: 'A20.01',
        description: null,
        handover: null,
        medias: null,
        status: 0,
        status_name: 'Chưa ở',
        capacity: 75,
        building_area: { id: 17, name: 'A30' },
        resident_user: { id: '', phone: '', first_name: '', last_name: '' },
        resident_user_name: '',
        parent_path: 'A30',
        code: 'EBZLV9',
        date_received: null,
        date_delivery: 1670723410,
        set_water_level: 1,
        total_members: 1,
        form_type: 11,
        form_type_name: 'Villa The Symphony',
        form_type_name_en: 'Villa The Symphony',
        created_at: 1709689811,
        updated_at: 1709689811,
      },
      {
        id: 22,
        name: 'A20.01',
        description: null,
        handover: null,
        medias: null,
        status: 0,
        status_name: 'Chưa ở',
        capacity: 75,
        building_area: { id: 17, name: 'A30' },
        resident_user: { id: '', phone: '', first_name: '', last_name: '' },
        resident_user_name: '',
        parent_path: 'A30',
        code: 'EBZLV9',
        date_received: null,
        date_delivery: 1670723410,
        set_water_level: 1,
        total_members: 1,
        form_type: 11,
        form_type_name: 'Villa The Symphony',
        form_type_name_en: 'Villa The Symphony',
        created_at: 1709689811,
        updated_at: 1709689811,
      },
      {
        id: 21,
        name: 'A20.01',
        description: null,
        handover: null,
        medias: null,
        status: 0,
        status_name: 'Chưa ở',
        capacity: 75,
        building_area: { id: 17, name: 'A30' },
        resident_user: { id: '', phone: '', first_name: '', last_name: '' },
        resident_user_name: '',
        parent_path: 'A30',
        code: 'EBZLV9',
        date_received: null,
        date_delivery: 1670723410,
        set_water_level: 1,
        total_members: 1,
        form_type: 11,
        form_type_name: 'Villa The Symphony',
        form_type_name_en: 'Villa The Symphony',
        created_at: 1709689811,
        updated_at: 1709689811,
      },
      {
        id: 20,
        name: 'A20.01',
        description: null,
        handover: null,
        medias: null,
        status: 0,
        status_name: 'Chưa ở',
        capacity: 75,
        building_area: { id: 17, name: 'A30' },
        resident_user: { id: '', phone: '', first_name: '', last_name: '' },
        resident_user_name: '',
        parent_path: 'A30',
        code: 'EBZLV9',
        date_received: null,
        date_delivery: 1670723410,
        set_water_level: 1,
        total_members: 1,
        form_type: 11,
        form_type_name: 'Villa The Symphony',
        form_type_name_en: 'Villa The Symphony',
        created_at: 1709689811,
        updated_at: 1709689811,
      },
      {
        id: 19,
        name: 'A20.01',
        description: null,
        handover: null,
        medias: null,
        status: 0,
        status_name: 'Chưa ở',
        capacity: 75,
        building_area: { id: 17, name: 'A30' },
        resident_user: { id: '', phone: '', first_name: '', last_name: '' },
        resident_user_name: '',
        parent_path: 'A30',
        code: 'EBZLV9',
        date_received: null,
        date_delivery: 1670723410,
        set_water_level: 1,
        total_members: 1,
        form_type: 11,
        form_type_name: 'Villa The Symphony',
        form_type_name_en: 'Villa The Symphony',
        created_at: 1709689811,
        updated_at: 1709689811,
      },
      {
        id: 18,
        name: 'A20.01',
        description: null,
        handover: null,
        medias: null,
        status: 0,
        status_name: 'Chưa ở',
        capacity: 75,
        building_area: { id: 17, name: 'A30' },
        resident_user: { id: '', phone: '', first_name: '', last_name: '' },
        resident_user_name: '',
        parent_path: 'A30',
        code: 'EBZLV9',
        date_received: null,
        date_delivery: 1670723410,
        set_water_level: 1,
        total_members: 1,
        form_type: 11,
        form_type_name: 'Villa The Symphony',
        form_type_name_en: 'Villa The Symphony',
        created_at: 1709689811,
        updated_at: 1709689811,
      },
      {
        id: 17,
        name: 'A20.01',
        description: null,
        handover: null,
        medias: null,
        status: 0,
        status_name: 'Chưa ở',
        capacity: 75,
        building_area: { id: 17, name: 'A30' },
        resident_user: { id: '', phone: '', first_name: '', last_name: '' },
        resident_user_name: '',
        parent_path: 'A30',
        code: 'EBZLV9',
        date_received: null,
        date_delivery: 1670723410,
        set_water_level: 1,
        total_members: 1,
        form_type: 11,
        form_type_name: 'Villa The Symphony',
        form_type_name_en: 'Villa The Symphony',
        created_at: 1709689811,
        updated_at: 1709689811,
      },
      {
        id: 16,
        name: 'E1-01',
        description: null,
        handover: null,
        medias: null,
        status: 1,
        status_name: 'Đã ở',
        capacity: 70,
        building_area: { id: 17, name: 'A30' },
        resident_user: { id: 1, phone: '84356577053', first_name: 'Hoàng', last_name: 'Thuý' },
        resident_user_name: 'Hoàng Thúy',
        parent_path: 'A30',
        code: 'Z11RYH',
        date_received: 1709629871,
        date_delivery: 1709628308,
        set_water_level: 1,
        total_members: 2,
        form_type: 0,
        form_type_name: 'Mini Hotel',
        form_type_name_en: 'Mini Hotel',
        created_at: 1709628298,
        updated_at: 1709629871,
      },
      {
        id: 14,
        name: 'A09.08',
        description: null,
        handover: null,
        medias: null,
        status: 1,
        status_name: 'Đã ở',
        capacity: 200,
        building_area: { id: 17, name: 'A30' },
        resident_user: { id: 1, phone: '84356577053', first_name: 'Hoàng', last_name: 'Thuý' },
        resident_user_name: 'Hoàng Thúy',
        parent_path: 'A30',
        code: 'RW0BR3',
        date_received: 1709629854,
        date_delivery: 1709626124,
        set_water_level: 1,
        total_members: 3,
        form_type: 0,
        form_type_name: 'Mini Hotel',
        form_type_name_en: 'Mini Hotel',
        created_at: 1709626125,
        updated_at: 1709629854,
      },
      {
        id: 13,
        name: 'A03.09',
        description: null,
        handover: null,
        medias: null,
        status: 1,
        status_name: 'Đã ở',
        capacity: 70,
        building_area: { id: 16, name: 'Tầng 03' },
        resident_user: { id: 1, phone: '84356577053', first_name: 'Hoàng', last_name: 'Thuý' },
        resident_user_name: 'Hoàng Thúy',
        parent_path: 'Khu A/Tòa C/Tầng 03',
        code: 'P6TOLY',
        date_received: 1709628409,
        date_delivery: 1709626697,
        set_water_level: 1,
        total_members: 1,
        form_type: 1,
        form_type_name: 'Shophouse Premium',
        form_type_name_en: 'Shophouse Premium',
        created_at: 1709625226,
        updated_at: 1709628409,
      },
      {
        id: 11,
        name: 'B02.05',
        description: null,
        handover: null,
        medias: null,
        status: 1,
        status_name: 'Đã ở',
        capacity: 100,
        building_area: { id: 7, name: 'Tầng 04' },
        resident_user: { id: 1, phone: '84356577053', first_name: 'Hoàng', last_name: 'Thuý' },
        resident_user_name: 'Hoàng Thúy',
        parent_path: 'Khu H/Tòa B/Tầng 04',
        code: '6OTDVG',
        date_received: 1709626697,
        date_delivery: 1701418876,
        set_water_level: 1,
        total_members: 1,
        form_type: 3,
        form_type_name: 'Shophouse Garden',
        form_type_name_en: 'Shophouse Garden',
        created_at: 1701418879,
        updated_at: 1709626697,
      },
      {
        id: 10,
        name: 'KHQ01.01',
        description: null,
        handover: null,
        medias: null,
        status: 1,
        status_name: 'Đã ở',
        capacity: 100,
        building_area: { id: 3, name: 'Tầng 01' },
        resident_user: { id: 4, phone: '84942267355', first_name: 'Trần Ngọc', last_name: 'Ánh' },
        resident_user_name: 'Trần Ngọc Ánh',
        parent_path: 'Khu H/Tòa A/Tầng 01',
        code: 'ZASDEN',
        date_received: 1701160676,
        date_delivery: 1701154700,
        set_water_level: 1,
        total_members: 1,
        form_type: 0,
        form_type_name: 'Mini Hotel',
        form_type_name_en: 'Mini Hotel',
        created_at: 1701154700,
        updated_at: 1701160676,
      },
      {
        id: 9,
        name: 'KH01.01',
        description: null,
        handover: null,
        medias: null,
        status: 1,
        status_name: 'Đã ở',
        capacity: 100,
        building_area: { id: 6, name: 'Tầng 03' },
        resident_user: { id: 1, phone: '84356577053', first_name: 'Hoàng', last_name: 'Thuý' },
        resident_user_name: 'Hoàng Thúy',
        parent_path: 'Khu H/Tòa B/Tầng 03',
        code: 'YYZQEB',
        date_received: 1709626697,
        date_delivery: 1700713947,
        set_water_level: 1,
        total_members: 1,
        form_type: 0,
        form_type_name: 'Mini Hotel',
        form_type_name_en: 'Mini Hotel',
        created_at: 1701145961,
        updated_at: 1709626697,
      },
      {
        id: 8,
        name: 'B01.03',
        description: null,
        handover: null,
        medias: null,
        status: 1,
        status_name: 'Đã ở',
        capacity: 100,
        building_area: { id: 14, name: 'Tầng 04' },
        resident_user: { id: 4, phone: '84942267355', first_name: 'Trần Ngọc', last_name: 'Ánh' },
        resident_user_name: 'Trần Ngọc Ánh',
        parent_path: 'Khu A/Tòa D/Tầng 04',
        code: 'XODW18',
        date_received: 1709626697,
        date_delivery: 1701145790,
        set_water_level: 1,
        total_members: 1,
        form_type: 0,
        form_type_name: 'Mini Hotel',
        form_type_name_en: 'Mini Hotel',
        created_at: 1701145793,
        updated_at: 1709626697,
      },
      {
        id: 7,
        name: 'B01.02',
        description: 'q',
        handover: null,
        medias: null,
        status: 1,
        status_name: 'Đã ở',
        capacity: 100,
        building_area: { id: 6, name: 'Tầng 03' },
        resident_user: { id: 23, phone: '84828150890', first_name: 'Vũ Thị Hoa', last_name: '' },
        resident_user_name: 'Vũ Thị Hoa',
        parent_path: 'Khu H/Tòa B/Tầng 03',
        code: 'DODHON',
        date_received: 1701146390,
        date_delivery: 1701145904,
        set_water_level: 1,
        total_members: 1,
        form_type: 0,
        form_type_name: 'Mini Hotel',
        form_type_name_en: 'Mini Hotel',
        created_at: 1701143767,
        updated_at: 1701146390,
      },
      {
        id: 6,
        name: 'B01.01',
        description: null,
        handover: null,
        medias: null,
        status: 1,
        status_name: 'Đã ở',
        capacity: 100,
        building_area: { id: 6, name: 'Tầng 03' },
        resident_user: { id: 2, phone: '84866618010', first_name: 'Bui', last_name: 'Thuy' },
        resident_user_name: 'Bùi Thủy',
        parent_path: 'Khu H/Tòa B/Tầng 03',
        code: 'TEMTGM',
        date_received: 1709629886,
        date_delivery: 1701138211,
        set_water_level: 1,
        total_members: 1,
        form_type: 3,
        form_type_name: 'Shophouse Garden',
        form_type_name_en: 'Shophouse Garden',
        created_at: 1701074881,
        updated_at: 1709629886,
      },
      {
        id: 5,
        name: 'A02.05',
        description: null,
        handover: null,
        medias: null,
        status: 1,
        status_name: 'Đã ở',
        capacity: 200,
        building_area: { id: 3, name: 'Tầng 01' },
        resident_user: { id: 1, phone: '84356577053', first_name: 'Hoàng', last_name: 'Thuý' },
        resident_user_name: 'Hoàng Thúy',
        parent_path: 'Khu H/Tòa A/Tầng 01',
        code: 'LCCUNF',
        date_received: 1709629993,
        date_delivery: 1700731399,
        set_water_level: 1,
        total_members: 1,
        form_type: 7,
        form_type_name: 'Shophouse Sapphire',
        form_type_name_en: 'Shophouse Sapphire',
        created_at: 1700731401,
        updated_at: 1709629993,
      },
      {
        id: 4,
        name: 'A02.01',
        description: null,
        handover: null,
        medias: null,
        status: 1,
        status_name: 'Đã ở',
        capacity: 100,
        building_area: { id: 3, name: 'Tầng 01' },
        resident_user: { id: 1, phone: '84356577053', first_name: 'Hoàng', last_name: 'Thuý' },
        resident_user_name: 'Hoàng Thúy',
        parent_path: 'Khu H/Tòa A/Tầng 01',
        code: 'O4GGHC',
        date_received: 1709628259,
        date_delivery: 1700644981,
        set_water_level: 1,
        total_members: 1,
        form_type: 0,
        form_type_name: 'Mini Hotel',
        form_type_name_en: 'Mini Hotel',
        created_at: 1700644967,
        updated_at: 1709628259,
      },
      {
        id: 3,
        name: 'A01.03',
        description: null,
        handover: null,
        medias: null,
        status: 1,
        status_name: 'Đã ở',
        capacity: 200,
        building_area: { id: 13, name: 'Tầng 03' },
        resident_user: { id: 1, phone: '84356577053', first_name: 'Hoàng', last_name: 'Thuý' },
        resident_user_name: 'Hoàng Thúy',
        parent_path: 'Khu A/Tòa D/Tầng 03',
        code: 'UDZ97G',
        date_received: 1709626697,
        date_delivery: 1701145757,
        set_water_level: 1,
        total_members: 1,
        form_type: 4,
        form_type_name: 'Shophouse Opal',
        form_type_name_en: 'Shophouse Opal',
        created_at: 1700019655,
        updated_at: 1709626697,
      },
      {
        id: 2,
        name: 'A01.02',
        description: null,
        handover: null,
        medias: null,
        status: 1,
        status_name: 'Đã ở',
        capacity: 120,
        building_area: { id: 12, name: 'Tầng 02' },
        resident_user: { id: 1, phone: '84356577053', first_name: 'Hoàng', last_name: 'Thuý' },
        resident_user_name: 'Hoàng Thúy',
        parent_path: 'Khu A/Tòa C/Tầng 02',
        code: 'FQP2MB',
        date_received: 1709630020,
        date_delivery: 1699926193,
        set_water_level: 1,
        total_members: 2,
        form_type: 11,
        form_type_name: 'Villa The Symphony',
        form_type_name_en: 'Villa The Symphony',
        created_at: 1699926182,
        updated_at: 1709630020,
      },
      {
        id: 1,
        name: 'A01.01',
        description: null,
        handover: null,
        medias: null,
        status: 1,
        status_name: 'Đã ở',
        capacity: 55,
        building_area: { id: 3, name: 'Tầng 01' },
        resident_user: { id: 1, phone: '84356577053', first_name: 'Hoàng', last_name: 'Thuý' },
        resident_user_name: 'Hoàng Thúy',
        parent_path: 'Khu H/Tòa A/Tầng 01',
        code: 'DRXRGQ',
        date_received: 1709630457,
        date_delivery: 1699846803,
        set_water_level: 1,
        total_members: 2,
        form_type: 2,
        form_type_name: 'Shophouse Diamond',
        form_type_name_en: 'Shophouse Diamond',
        created_at: 1699411549,
        updated_at: 1709697652,
      },
    ],
  },
  sectionList: {
    items: [
      {
        id: 17,
        name: 'A30',
        description: 'A30',
        medias: null,
        status: 0,
        type: 1,
        type_name: 'Tòa nhà',
        parent_id: null,
        parent_path: '',
        short_name: 'A30',
        created_at: 1708413897,
        updated_at: 1708413897,
      },
      {
        id: 18,
        name: 'A31',
        description: 'A31',
        medias: null,
        status: 0,
        type: 1,
        type_name: 'Tòa nhà',
        parent_id: null,
        parent_path: '',
        short_name: 'A31',
        created_at: 1709625985,
        updated_at: 1709625985,
      },
      {
        id: 8,
        name: 'Khu A',
        description: 'Khu A',
        medias: null,
        status: 0,
        type: 1,
        type_name: 'Tòa nhà',
        parent_id: null,
        parent_path: '',
        short_name: 'Khu A',
        created_at: 1699411961,
        updated_at: 1699411961,
      },
      {
        id: 1,
        name: 'Khu H',
        description: 'Khu H',
        medias: null,
        status: 1,
        type: 2,
        type_name: 'Khu',
        parent_id: null,
        parent_path: '',
        short_name: 'Khu H',
        created_at: 1699411549,
        updated_at: 1699411549,
      },
      {
        id: 3,
        name: 'Tầng 01',
        description: 'Tầng 01',
        medias: null,
        status: 1,
        type: 0,
        type_name: 'Tầng',
        parent_id: 2,
        parent_path: 'Khu H/Tòa A',
        short_name: 'Tầng 01',
        created_at: 1699411549,
        updated_at: 1699411549,
      },
      {
        id: 11,
        name: 'Tầng 01',
        description: 'T01',
        medias: null,
        status: 0,
        type: 3,
        type_name: 3,
        parent_id: 9,
        parent_path: 'Khu A/Tòa C',
        short_name: 'T01',
        created_at: 1699412006,
        updated_at: 1699412006,
      },
      {
        id: 4,
        name: 'Tầng 02',
        description: 'Tầng 02',
        medias: null,
        status: 0,
        type: 3,
        type_name: 3,
        parent_id: 2,
        parent_path: 'Khu H/Tòa A',
        short_name: 'Tầng 02',
        created_at: 1699411724,
        updated_at: 1699411724,
      },
      {
        id: 12,
        name: 'Tầng 02',
        description: 'T02',
        medias: null,
        status: 0,
        type: 3,
        type_name: 3,
        parent_id: 9,
        parent_path: 'Khu A/Tòa C',
        short_name: 'T02',
        created_at: 1699412019,
        updated_at: 1699412019,
      },
      {
        id: 6,
        name: 'Tầng 03',
        description: 'Tầng 03',
        medias: null,
        status: 0,
        type: 3,
        type_name: 3,
        parent_id: 5,
        parent_path: 'Khu H/Tòa B',
        short_name: 'Tầng 03',
        created_at: 1699411925,
        updated_at: 1699411925,
      },
      {
        id: 16,
        name: 'Tầng 03',
        description: 'T03',
        medias: { imageUrl: '/uploads/images/202401/1706511803-bds.jpg' },
        status: 0,
        type: 3,
        type_name: 3,
        parent_id: 9,
        parent_path: 'Khu A/Tòa C',
        short_name: 'T_03',
        created_at: 1706511816,
        updated_at: 1706511816,
      },
      {
        id: 13,
        name: 'Tầng 03',
        description: 'T03',
        medias: null,
        status: 0,
        type: 3,
        type_name: 3,
        parent_id: 10,
        parent_path: 'Khu A/Tòa D',
        short_name: 'T03',
        created_at: 1699412049,
        updated_at: 1699412049,
      },
      {
        id: 7,
        name: 'Tầng 04',
        description: 'Tầng 04',
        medias: null,
        status: 0,
        type: 3,
        type_name: 3,
        parent_id: 5,
        parent_path: 'Khu H/Tòa B',
        short_name: 'Tầng 04',
        created_at: 1699411943,
        updated_at: 1699411943,
      },
      {
        id: 14,
        name: 'Tầng 04',
        description: 'T04',
        medias: null,
        status: 0,
        type: 3,
        type_name: 3,
        parent_id: 10,
        parent_path: 'Khu A/Tòa D',
        short_name: 'T04',
        created_at: 1699412061,
        updated_at: 1699412061,
      },
      {
        id: 2,
        name: 'Tòa A',
        description: 'Tòa A',
        medias: null,
        status: 1,
        type: 1,
        type_name: 'Tòa nhà',
        parent_id: 1,
        parent_path: 'Khu H',
        short_name: 'Tòa A',
        created_at: 1699411549,
        updated_at: 1699411549,
      },
      {
        id: 5,
        name: 'Tòa B',
        description: 'Tòa B',
        medias: null,
        status: 0,
        type: 2,
        type_name: 'Khu',
        parent_id: 1,
        parent_path: 'Khu H',
        short_name: 'Tòa B',
        created_at: 1699411741,
        updated_at: 1699411741,
      },
      {
        id: 9,
        name: 'Tòa C',
        description: 'Tòa C',
        medias: null,
        status: 0,
        type: 2,
        type_name: 'Khu',
        parent_id: 8,
        parent_path: 'Khu A',
        short_name: 'Tòa C',
        created_at: 1699411975,
        updated_at: 1699411975,
      },
      {
        id: 10,
        name: 'Tòa D',
        description: 'Tòa D',
        medias: null,
        status: 0,
        type: 2,
        type_name: 'Khu',
        parent_id: 8,
        parent_path: 'Khu A',
        short_name: 'Tòa D',
        created_at: 1699411988,
        updated_at: 1699411988,
      },
    ],
  },
};

export interface ISectionListItem {
  id: number;
  name: string;
  description: string;
  medias: { imageUrl: string } | null;
  status: number;
  type: number;
  type_name: string | number;
  parent_id: number | null;
  parent_path: string;
  short_name: string;
  created_at: number;
  updated_at: number;
}

export interface IDevicesListItem {
  id: number;
  name: string;
  description: string | null;
  handover: string | null;
  medias: string | null;
  status: number;
  status_name: string;
  capacity: number;
  building_area: {
    id: number;
    name: string;
  } | null;
  resident_user: {
    id: number | string;
    phone: string;
    first_name: string;
    last_name: string;
  } | null;
  resident_user_name: string;
  parent_path: string;
  code: string;
  date_received: number | null;
  date_delivery: number;
  set_water_level: number;
  total_members: number;
  form_type: number;
  form_type_name: string;
  form_type_name_en: string;
  created_at: number;
  updated_at: number;
}

export interface IAnchorItem {
  key: string;
  href: string;
  title: string;
  children?: IAnchorItem[];
  renderDevice?: IDevicesListItem[];
  level: number;
}

// function to generate anchor list
export function generateAnchorList(
  deviceList: IDevicesListItem[],
  sectionList: ISectionListItem[],
): IAnchorItem[] {
  const getChildren = (parentId: number | null, level = 0) => {
    const children: IAnchorItem[] = [];
    sectionList.forEach((item) => {
      const renderDevice = deviceList.filter((device) => device?.building_area?.id === item.id);
      if (item.parent_id === parentId) {
        const child = getChildren(item.id, level + 1);
        if (!renderDevice.length && !child.length) {
          return;
        } else {
          children.push({
            key: `anchor${item.id}`,
            href: `#anchor${item.id}`,
            title: item.name,
            children: child,
            renderDevice,
            level: level + 1,
          });
        }
      }
    });
    return children;
  };
  const anchorList = getChildren(null);
  return anchorList;
}

export function generateTreeNode(
  deviceList: IDevicesListItem[],
  sectionList: ISectionListItem[],
): TreeDataNode[] {
  const getChildren = (parentId: number | null, level = 0) => {
    const children: IAnchorItem[] = [];
    sectionList.forEach((item) => {
      const renderDevice = deviceList.filter((device) => device?.building_area?.id === item.id);
      if (item.parent_id === parentId) {
        const child = getChildren(item.id, level + 1);
        if (!renderDevice.length && !child.length) {
          return;
        } else {
          children.push({
            key: `anchor${item.id}`,
            href: `#anchor${item.id}`,
            title: item.name,
            children: child,
            renderDevice,
            level: level + 1,
          });
        }
      }
    });
    return children;
  };
  const anchorList = getChildren(null);
  return anchorList;
}
export interface IGroupDevices {
  id?: number;
  group_name?: string;
  category?: string;
  section?: string;
  icon?: IconVariant;
  devices?: number[];
}

export interface IGroupType {
  group_normal: IGroupDevices[];
  group_lighting: IGroupDevices[];
}

export interface FieldType {
  type?: string;
  group_name?: string;
  category?: string;
  section?: string;
  icon?: IconVariant;
  devices?: IDevicesListItem[];
}

export const FAKE_GROUP_CHILD: IGroupType = {
  group_lighting: [
    {
      id: 1,
      group_name: 'group 1',
      category: 'dimmer',
      icon: 'bulb',
      section: 'Khu A1',
      devices: [1, 2, 3, 4],
    },
    {
      id: 2,
      group_name: 'group 2',
      category: 'rgb',
      icon: 'gift',
      section: 'Khu A2',
      devices: [1, 2, 3, 4, 5],
    },
    {
      id: 3,
      group_name: 'group 3',
      category: 'rgb',
      icon: 'moon',
      section: 'Khu A2',
      devices: [6, 7, 8],
    },
    {
      id: 4,
      group_name: 'group 4',
      category: 'ww',
      icon: 'rocket',
      section: 'Khu A3',
      devices: [1, 2, 3],
    },
    {
      id: 5,
      group_name: 'group 5',
      category: 'ww',
      icon: 'rocket',
      section: 'Khu A3',
      devices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      id: 6,
      group_name: 'group 6',
      category: 'ww',
      icon: 'rocket',
      section: 'Khu A3',
      devices: [1, 2, 3],
    },
  ],
  group_normal: [
    {
      id: 1,
      group_name: 'group 1',
      category: 'WW',
      icon: 'rocket',
      section: 'Khu A3',
      devices: [1, 2, 3],
    },
    {
      id: 2,
      group_name: 'group 2',
      category: 'WW',
      icon: 'rocket',
      section: 'Khu A3',
      devices: [8, 9, 10, 11, 12, 13],
    },
    {
      id: 3,
      group_name: 'group 3',
      category: 'WW',
      icon: 'rocket',
      section: 'Khu A3',
      devices: [1, 2, 3, 4],
    },
    {
      id: 4,
      group_name: 'group 4',
      category: 'WW',
      icon: 'rocket',
      section: 'Khu A3',
      devices: [1, 2, 3, 4, 5],
    },
  ],
};
