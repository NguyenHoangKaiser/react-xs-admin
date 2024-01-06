import { api } from '@/server/index';
import { APIs } from '@/utils/constant';
import { transformErrorResponse } from '@/server';

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type GetTodosResponse = ITodo[];

export const todosApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<GetTodosResponse, void>({
      query: () => APIs.GET_TODOS,
      transformErrorResponse,
      // we need to manually specify the tags type in the createApi call tagTypes: ['Todos'] to use this
      providesTags: (result = []) => [
        ...result.map((ids) => ({ type: 'Todos', ids } as const)),
        { type: 'Todos' as const, id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useGetTodosQuery } = todosApi;
