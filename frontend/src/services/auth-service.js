import axios from "axios";

import { baseUrl } from "../remote";
import { clearUser, getUser } from './user-service'

export async function login(email, password) {
    try {
        const response = await axios.post(`${baseUrl}/auth/login`, {
            email,
            password,
        });
        if (response.status === 202) {
            localStorage.setItem("access_token", response.data.token);
            return getUser();
        }
    } catch (_) {
        alert('invalid credentials')
        return null;
    }
}

export function getAccessToken() {
    return localStorage.getItem("access_token");
}

export function logout() {
    localStorage.removeItem("access_token");
    clearUser();
}
