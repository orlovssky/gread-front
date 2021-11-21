import type { MantineThemeOverride } from '@mantine/core';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as themes from 'themes';

const storedTheme = localStorage.getItem('theme');
let theme = themes.sepia;
switch (storedTheme) {
  case 'dark':
    theme = themes.dark;
    break;
  case 'light':
    theme = themes.light;
    break;
}

interface ThemeModel {
  theme: MantineThemeOverride;
}

const initialState: ThemeModel = {
  theme: theme
};

export const mainThemeSlice = createSlice({
  name: 'mainTheme',
  initialState,
  reducers: {
    setMainTheme: (state, action: PayloadAction<MantineThemeOverride>) => {
      state.theme = action.payload;
    }
  }
});

export const { setMainTheme } = mainThemeSlice.actions;

export default mainThemeSlice.reducer;
