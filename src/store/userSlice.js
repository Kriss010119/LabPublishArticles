import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://your-api-url.com/auth';

// Асинхронные actions (thunks)
export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/register`, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuth: false,
        userData: null,
        loading: false,
        error: null,
        registerSuccess: false
    },
    reducers: {
        // Синхронные actions
        signIn: (state, action) => {
            state.isAuth = true;
            state.userData = action.payload;
        },
        signOut: (state) => {
            state.isAuth = false;
            state.userData = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetRegisterStatus: (state) => {
            state.registerSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuth = true;
                state.userData = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Ошибка входа';
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.registerSuccess = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Ошибка регистрации';
            });
    }
});

// Экспортируем только синхронные actions и reducer
export const {
    signIn,
    signOut,
    clearError,
    resetRegisterStatus
} = userSlice.actions;

export default userSlice.reducer;