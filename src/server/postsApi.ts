import { api, transformFactory } from '@/server/index';
import { APIs } from '@/utils/constant';

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
      query: () => APIs.MOCK_GET_TODOS,
      ...transformFactory<GetTodosResponse>(),
      // we need to manually specify the tags type in the createApi call tagTypes: ['Todos'] to use this
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Todos' as const, id })),
        { type: 'Todos' as const, id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useGetTodosQuery } = todosApi;
