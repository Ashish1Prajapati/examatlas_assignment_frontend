import axios from "axios";
const path = "http://localhost:4000/api/users";

export const handleLogin = async (body) => {
    try {
        const headers = {
            "Content-Type": "application/json",
        };
        const response = await axios.post(`${path}/login`, body, { headers });
        // console.log(response)
        if (response.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return error?.response?.data;
    }
};
export const handleRegister = async (body) => {
    try {
        const headers = {
            "Content-Type": "application/json",
        };
        const response = await axios.post(`${path}/register`, body, {
            headers,
        });

        if (response.status === 201) {
            return response?.data;
        }
    } catch (error) {
        return error?.response?.data;
    }
};
export const getUserInfo = async (accessToken) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(`${path}/me`, {
            headers,
        });
        if (response.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return error?.response?.data;
    }
}