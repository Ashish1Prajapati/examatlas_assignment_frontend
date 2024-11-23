import axios from "axios";
import Cookies from "js-cookie";
const path = "http://localhost:4000/api/order";

export const CreateOrder = async (body) => {
    const accessToken = Cookies.get("accessToken")
    try {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.post(`${path}/create`, body, { headers });
        console.log(response)
        if (response.status===201) {
            return response.data;
        }
    } catch (error) {
        return error?.response?.data;
    }
};
export const getAllOrder = async () => {
    try {
        const accessToken = Cookies.get("accessToken")
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get(`${path}`, {
            headers,
        });
        if (response.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return error?.response?.data;
    }
}
export const cancelOrder = async (orderId) => {
    try {
        const accessToken = Cookies.get("accessToken");
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.post(`${path}/cancel/${orderId}`, {}, { headers });

        console.log(response);
        if (response.status===200) {
            return response.data
        } else {
            console.error("Failed to cancel order", response.data.message);
        }
    } catch (error) {
        console.error("Error cancelling order:", error.response ? error.response.data : error.message);
    }
};

