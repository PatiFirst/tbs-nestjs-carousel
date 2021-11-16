import axios from "../../config/axios";
import { AdminProps, LoginProps, SignUpProps, TOKEN } from "./auth.model";

export function getAuthToken() {
    if((process as any).browser as any) {
        return localStorage.getItem(TOKEN)
    }
    return null;
}

export function userLogin(_loginProps: LoginProps) {
    return axios.post('/auth/signin/user', {..._loginProps})
}

export function userSignUp(_signUpProps: SignUpProps) {
    return axios.post('/auth/signup/user', {..._signUpProps})
}

export function adminLogin(_loginProps: AdminProps) {
    return axios.post('/auth/signin/admin', {..._loginProps})
}