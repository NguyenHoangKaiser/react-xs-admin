import io from 'socket.io-client';
import type { WsResponse } from '../types/socket';

const URL =
  import.meta.env.VITE_ENV === 'production'
    ? window.location.host
    : 'https://socket.hotel.luci.vn:4333';

export type TSocket = SocketIOClientStatic['Socket'];

// Create the socket instance only once for a specific socket.io namespace.
export const createSocketFactory = ({
  accessToken,
  url,
  userId,
}: {
  accessToken: string;
  url?: string;
  userId: number;
}) => {
  let _socket: TSocket;
  const type = 'smarthotel';

  return async (): Promise<TSocket> => {
    if (!_socket) {
      _socket = io(url || URL, {
        query: {
          auth_token: accessToken,
          type,
          user_id: userId,
        },
        transports: ['websocket'],
      });
    }

    if (_socket.disconnected) {
      _socket.connect();
    }

    return _socket;
  };
};

export const socketEmitAsPromise = (socket: TSocket) => {
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
