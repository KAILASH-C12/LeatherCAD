import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,

    login: async (email, password, role) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });

            const { token, ...userData } = response.data;

            // Check if the user has the correct role
            if (role && userData.role !== role && userData.role !== 'admin') {
                // Allow admin to login anywhere, but restrict others
                throw new Error(`Access denied. This portal is for ${role}s only.`);
            }

            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', token);

            set({
                user: userData,
                token: token,
                isAuthenticated: true,
                isLoading: false
            });
            return true;
        } catch (err) {
            set({
                error: err.response?.data?.message || err.message || 'Login failed',
                isLoading: false
            });
            return false;
        }
    },

    signup: async (name, email, password, company, role = 'designer') => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/register`, { name, email, password, company, role });
            const { token, ...userData } = response.data;

            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', token);

            set({
                user: userData,
                token: token,
                isAuthenticated: true,
                isLoading: false
            });
            return true;
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Signup failed',
                isLoading: false
            });
            return false;
        }
    },

    googleLogin: async (email, name, googleId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/google`, { email, name, googleId });
            const { token, ...userData } = response.data;

            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', token);

            set({
                user: userData,
                token: token,
                isAuthenticated: true,
                isLoading: false
            });
            return true;
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Google Login failed',
                isLoading: false
            });
            return false;
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/forgotpassword`, { email });
            set({ isLoading: false });
            return true;
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Request failed',
                isLoading: false
            });
            return false;
        }
    },

    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(`${API_URL}/resetpassword/${token}`, { password });
            const { token: newToken, ...userData } = response.data; // Assuming backend returns user/token on success or we just redirect to login

            // If backend auto-logs in:
            if (newToken) {
                localStorage.setItem('token', newToken);
                // might need user data too if backend sends it.
            }

            set({ isLoading: false });
            return true;
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Reset failed',
                isLoading: false
            });
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
    },

    clearError: () => set({ error: null })
}));

export default useAuthStore;
