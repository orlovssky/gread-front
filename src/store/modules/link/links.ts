import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LinkModel } from 'models/link';

interface InitialStateModel {
  link: LinkModel | null;
  links: LinkModel[];
}

const initialState: InitialStateModel = {
  link: null,
  links: []
};

export const linkLinksSlice = createSlice({
  name: 'linkLinks',
  initialState,
  reducers: {
    setLink: (state, action: PayloadAction<LinkModel | null>) => {
      state.link = action.payload;
    },
    setLinks: (state, action: PayloadAction<LinkModel[]>) => {
      state.links = action.payload;
    }
  }
});

export const { setLink, setLinks } = linkLinksSlice.actions;

export default linkLinksSlice.reducer;
