import axios from "axios";
import appConfig from "../appConfig";
import { getAuthToken } from "../services/auth/auth.service";

axios.interceptors.request.use(async (config: any) => {
    config.baseURL = appConfig.NEXT_PUBLIC_API_URL;
    
    const jwtToken = getAuthToken();
    if (jwtToken !== null) {
        config.headers['Authorization'] = `Bearer ${jwtToken}`;
    }
    return config;
})

export default axios;