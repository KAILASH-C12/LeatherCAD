import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('devToken');
    // If Clerk token exists, you might want to prefer that, 
    // but for this specific "Dev Fix", we prioritize the devToken if set.
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        // Fallback for Clerk or other auth if needed, 
        // though typically this would be handled by a separate calls or context.
        // For now, let's keep it simple as requested.
    }
    return config;
});

export default api;
