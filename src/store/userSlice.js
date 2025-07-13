import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://89.169.180.108:8080/api/v1/auth';

export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Ошибка входа');
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
            return rejectWithValue(error.response.data.message || 'Ошибка регистрации');
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuth: !!localStorage.getItem('token'),
        userData: null,
        loading: false,
        error: null,
        registerSuccess: false
    },
    reducers: {
        signOut: (state) => {
            state.isAuth = false;
            state.userData = null;
            localStorage.removeItem('token');
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
                state.userData = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
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
                state.error = action.payload;
            });
    }
});

export const { signOut, clearError, resetRegisterStatus } = userSlice.actions;
export default userSlice.reducer;