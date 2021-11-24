import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from 'models/user';

interface InitialStateModel {
  profile: UserModel;
}

const initialState: InitialStateModel = {
  profile: {
    id: 0,
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: ''
  }
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserModel>) => {
      state.profile = action.payload;
    }
  }
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
