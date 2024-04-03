import type { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

const todoList = [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: 'fugiat veniam minus',
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: 'et porro tempora',
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
    completed: false,
  },
  {
    userId: 1,
    id: 6,
    title: 'qui ullam ratione quibusdam voluptatem quia omnis',
    completed: false,
  },
  {
    userId: 1,
    id: 7,
    title: 'illo expedita consequatur quia in',
    completed: false,
  },
  {
    userId: 1,
    id: 8,
    title: 'quo adipisci enim quam ut ab',
    completed: true,
  },
  {
    userId: 1,
    id: 9,
    title: 'molestiae perspiciatis ipsa',
    completed: false,
  },
  {
    userId: 1,
    id: 10,
    title: 'illo est ratione doloremque quia maiores aut',
    completed: true,
  },
];

const sectionList = {
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
};

export default [
  {
    url: '/mock_api/todos',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(todoList);
    },
  },
  {
    url: '/mock_api/sections-list',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(sectionList);
    },
  },
] as MockMethod[];
