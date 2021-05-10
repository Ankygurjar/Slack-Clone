import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    roomId: null,
    msgReceverId: null,
    userName: null
  },

  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId
    },
    selectUser: (state, action) =>{
      state.msgReceverId = action.payload.msgReceverId
      state.userName = action.payload.userName
      state.image = action.payload.image

    }
  }
});

export const { enterRoom, selectUser } = appSlice.actions;

export const selectRoomId = (state) => state.app.roomId;

export const selectUserId = (state) => state.app.msgReceverId

export const selectUserName = (state) => state.app.userName

export const selectUserImage = (state) => state.app.image

export default appSlice.reducer;
