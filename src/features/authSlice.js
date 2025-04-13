import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

// Login con Google
export const loginGoogle = createAsyncThunk('auth/loginGoogle', async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return { user: result.user };
});

// Login con Email e Password
export const loginEmailPassword = createAsyncThunk('auth/loginEmailPassword', async ({ email, password }) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return { user: result.user };
});

// Registrazione con Email e Password
export const registerEmailPassword = createAsyncThunk('auth/registerEmailPassword', async ({ email, password }) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return { user: result.user };
});

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginEmailPassword.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(registerEmailPassword.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
