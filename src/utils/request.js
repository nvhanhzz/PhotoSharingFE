import axios from 'axios';

const DOMAIN = "http://localhost:8081/";

const axiosInstance = axios.create({
    baseURL: DOMAIN,
    withCredentials: true
});

export const get = async (path) => {
    try {
        const response = await axiosInstance.get(path);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export const post = async (path, option) => {
    try {
        const response = await axiosInstance.post(path, option);
        console.log(DOMAIN + path);
        return response.data;
    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }
}

export const patch = async (path, option) => {
    try {
        const response = await axiosInstance.patch(path, option);
        return response.data;
    } catch (error) {
        console.error("Error patching data:", error);
        throw error;
    }
}

export const del = async (path) => {
    try {
        const response = await axiosInstance.delete(path);
        return response.data;
    } catch (error) {
        console.error("Error deleting data:", error);
        throw error;
    }
}
