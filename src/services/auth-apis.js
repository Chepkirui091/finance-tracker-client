// src/services/auth-apis.js

import axios from 'axios';

// Load the base URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authApi = {
    register: (data) => apiClient.post('/register', data),
    login: (data) => apiClient.post('/login', data),
};
