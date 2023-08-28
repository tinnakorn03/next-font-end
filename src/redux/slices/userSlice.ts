import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, LogIn } from '@/common/types/Auth'
 
export interface IUser extends User {
  userId?: string | null;  
  token?: string | null;
}

interface RootState {
  user: IUser;
}

const initialState: IUser = {
  userId: '',
  username: '',
  role:'customer',
  isPdpa: false,
  firstName: '', 
  lastName: '',
  email: '',
  mobile: '',
  img: '',
  token: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.isPdpa = action.payload.isPdpa
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.email = action.payload.email
      state.mobile = action.payload.mobile
      state.img = action.payload.img
      state.token = action.payload.token;
    },
    resetUser: (state) => {
      state.userId = '';
      state.username = '';
      state.role = 'customer',
      state.isPdpa = false,
      state.firstName = '', 
      state.lastName = '',
      state.email = '',
      state.mobile = '',
      state.img = '', 
      state.token = null;  
    }, 
  },
});

// Selectors
export const getUser = (state: RootState) => state.user;

// Reducers and actions
export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
