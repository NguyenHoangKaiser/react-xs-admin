import type { IDeviceType, IFloor } from '@/server/apiTypes';
import { authApi } from '@/server/authApi';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

interface HotelSlice {
  hotel_id?: number;
  deviceType?: IDeviceType[];
  floors?: IFloor[];
  objFloor?: {};
  idx_Floor?: string;
  ip_local?: string;
}

const initialState: HotelSlice = {};

export const HotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setHotelId: (state, action: PayloadAction<number>) => {
      state.hotel_id = action.payload;
    },
    setDeviceType: (state, action: PayloadAction<IDeviceType[]>) => {
      state.deviceType = action.payload;
    },
    setFloors: (state, action: PayloadAction<IFloor[]>) => {
      state.floors = action.payload;
    },
    setObjFloor: (state, action: PayloadAction<{}>) => {
      state.objFloor = action.payload;
    },
    setIdxFloor: (state, action: PayloadAction<string>) => {
      state.idx_Floor = action.payload;
    },
    setIpLocal: (state, action: PayloadAction<string>) => {
      state.ip_local = action.payload;
    },
    setHotel: (state, action: PayloadAction<HotelSlice>) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      const hotel = payload.hotels?.[0];
      const floors = hotel?.floors?.filter((floor) => floor._id !== '640a0aaa93d12cc790014a64');
      state.hotel_id = hotel?.id;
      state.deviceType = hotel?.deviceType;
      state.floors = floors;
      state.idx_Floor = floors?.[0]._id;
      state.ip_local = hotel?.ip_local;
    });
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (_state, { payload }) => {
      if (payload) {
        return initialState;
      }
    });
  },
});

export const {
  setHotelId,
  setDeviceType,
  setFloors,
  setObjFloor,
  setIdxFloor,
  setIpLocal,
  setHotel,
} = HotelSlice.actions;

export const hotelSelector = (state: { hotel: HotelSlice }) => state.hotel;

export default HotelSlice.reducer;
