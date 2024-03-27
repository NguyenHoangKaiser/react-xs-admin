import { api } from '@/server';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { listenerMiddleware } from './listenerMiddleware';
import appReducer from './modules/app';
import hotelReducer from './modules/hotel';
import routeReducer from './modules/route';
import sceneReducer from './modules/scene';
import userReducer from './modules/user';

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  app: appReducer,
  route: routeReducer,
  user: userReducer,
  hotel: hotelReducer,
  scene: sceneReducer,
});

const persistConfig = {
  key: 'react-xs',
  storage,
  // whitelist
  // "initial",
  // "language",
  // "hotel",
  // "login",
  // "devices",
  // "controlDevices",
  // "charts",
  whitelist: ['app', 'route', 'user', 'hotel', 'scene'],
  // blacklist Redux Toolkit Query api is recommended
  blacklist: [api.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
});

setupListeners(store.dispatch);

// Inference from Store itself, `rootState` and` appDispatch` type
export type RootState = ReturnType<typeof store.getState>;
// Inference type: {Posts: PostsState, Comments: CommentsState, Users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
