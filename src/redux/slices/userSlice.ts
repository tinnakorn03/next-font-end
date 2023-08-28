import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  userId?: string | null;
  username?: string | null;
  token?: string | null;
}

interface RootState {
  user: IUser;
}

const initialState: IUser = {
  userId: '202308_000001',
  username: 'admin',
  token: "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJzdHJpbmciLCJpbWciOiJzdHJpbmciLCJsYXN0TmFtZSI6InN0cmluZyIsIm1vYmlsZSI6InN0cmluZyIsInBhc3N3b3JkIjoiJDJiJDEwJFhWVUVxaDdldi45ZU5KaEsvb2YyeXVHYk9oVjB2RXlBV0djYy5kcWxQNkpKaUpNMnp6YUlDIiwidXNlcklkIjoiMjAyMzA4NTg2Mzk2NTMifQ.txxwQfgEi_b8AuUsV7i_NFlfxPKftW3jkLHVd_c5908"
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    resetUser: (state) => {
      state.userId = null;
      state.username = null;
      state.token = null;
    }, 
  },
});

// Selectors
export const getUser = (state: RootState) => state.user;

// Reducers and actions
export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
