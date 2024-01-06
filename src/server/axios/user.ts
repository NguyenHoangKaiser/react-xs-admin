import { defHttp } from '@/utils/axios';

export interface UseInfoType {
  name: string;
  userId: string;
  email: string;
  signature: string;
  introduction: string;
  title: string;
  token: string;
  power: 'test' | 'admin';
}

export const getUserInfo = (user: string, pwd: string) =>
  defHttp.post<UseInfoType>(
    {
      url: '/mock_api/login',
      data: { username: user, password: pwd },
    },
    { errorMessageMode: 'modal', withToken: false },
  );
