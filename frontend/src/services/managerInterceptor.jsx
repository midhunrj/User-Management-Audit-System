
import axios from "axios";

import { toast } from "sonner";
import { managerUrl } from "../utils/config/urlConfig";


export const managerAuthenticate = axios.create({
    baseURL: managerUrl,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true 
});

const API_BASE_URL = import.meta.env.VITE_USER_URL;


managerAuthenticate.interceptors.request.use(
    (request) => {
        const managerAccessToken = localStorage.getItem('managerAccessToken');
        if (managerAccessToken) {
            request.headers.Authorization = `Bearer ${managerAccessToken}`;
        }
        console.log(request, "request sent");

        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const handleUnauthorizedAccess = (message) => {
    localStorage.removeItem("managerAccessToken");
     

    toast.error(message, {
        description: "Your session has expired. Please login again.",
        duration: 4000,  
        position: "top-right", 
    });

    
    setTimeout(() => {
        window.location.replace("/manager/"); 
    }, 2000);
};


managerAuthenticate.interceptors.response.use(
    (response) => {
        console.log(response,"response got");
        
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 (Unauthorized) for expired access token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh the token
                const response = await axios.get(`${API_BASE_URL}/auth/manager/refreshtoken`, { withCredentials: true });
                const newmanagerAccessToken = response.data.accessToken;

                // Store the new access token in localStorage
                localStorage.setItem('managerAccessToken', newmanagerAccessToken);

                // Set new token in Authorization header
                managerAuthenticate.defaults.headers.common["Authorization"] = `Bearer ${newmanagerAccessToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${newmanagerAccessToken}`;

                // Retry the original request with the new token
                return managerAuthenticate(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                // Clear tokens and possibly redirect to login if refresh fails
                localStorage.removeItem('managerAccessToken');
                // Handle navigation to login if needed, for example:
                // window.location.href = "/login"; // Redirect to login page
                return Promise.reject(refreshError);
            }
        }
        else if(error.response.status==403)
        {
            localStorage.removeItem('managerAccessToken')
            
            handleUnauthorizedAccess('User has been blocked temporarily')
        }

        return Promise.reject(error);
    }
);
