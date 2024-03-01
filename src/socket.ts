import type { Store } from '@reduxjs/toolkit';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import type { WsResponse } from '../types/socket';

const URL =
  process.env.NODE_ENV === 'production'
    ? window.location.host
    : 'https://socket.hotel.luci.vn:4333';

// export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, {
//   autoConnect: false,
// });

// Create the socket instance only once for a specific socket.io namespace.
export const createSocketFactory = ({
  accessToken,
  url,
  userId,
}: // store,
{
  accessToken: string;
  url?: string;
  userId: number;
  store?: Store;
}) => {
  let _socket: Socket;
  // const { access_token, user_id: userID } = store?.getState().user;

  // const auth_token = accessToken || access_token;
  const type = 'smarthotel';
  // const user_id = userId || userID;
  // console.log('store', store.getState());
  // if (!store) {
  //   console.error('Missing store', { store });
  //   return;
  // }

  // if (!auth_token || !user_id) {
  //   console.error('Missing auth_token or user_id', { auth_token, user_id });
  //   return;
  // }

  return async (): Promise<Socket> => {
    if (!_socket) {
      _socket = io(url || URL, {
        // auth: {
        //   token: accessToken,
        // },
        // withCredentials: true,
        query: {
          auth_token: accessToken,
          type,
          user_id: userId,
        },
        transports: ['websocket'],
        // transports: ['websocket', 'polling'],
      });
    }

    if (_socket.disconnected) {
      _socket.connect();
    }

    return _socket;
  };
};

export const socketEmitAsPromise = (socket: Socket) => {
  return <TData = any>(message: string, data: TData): Promise<any> => {
    return new Promise((resolve, reject) => {
      socket.emit(message, data, (response: WsResponse<TData>) => {
        if (response.error) {
          reject(response);
        } else {
          resolve(response);
        }
      });
    });
  };
};
