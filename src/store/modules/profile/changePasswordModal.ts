import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const profilechangePasswordModalSlice = createSlice({
  name: 'profilechangePasswordModal',
  initialState: {
    opened: false
  },
  reducers: {
    setDialogOpened: (state, action: PayloadAction<boolean>) => {
      state.opened = action.payload;
    }
  }
});

export const { setDialogOpened } = profilechangePasswordModalSlice.actions;

export default profilechangePasswordModalSlice.reducer;
