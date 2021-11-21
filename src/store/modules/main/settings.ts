import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const locale = localStorage.getItem('locale');

export const mainSettingsSlice = createSlice({
  name: 'mainSettings',
  initialState: {
    opened: false,
    locale: locale ? locale : 'ru'
  },
  reducers: {
    setSettingsOpened: (state, action: PayloadAction<boolean>) => {
      state.opened = action.payload;
    },
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    }
  }
});

export const { setSettingsOpened, setLocale } = mainSettingsSlice.actions;

export default mainSettingsSlice.reducer;
