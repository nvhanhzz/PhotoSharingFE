import { Delete, get, patch, post } from "../utils/request";
const prefixAuth = "api/auth";

export const postLogin = async (option) => {
    const result = await post(`${prefixAuth}/login`, option);
    if (result) {
        return result;
    }
}

export const postLogout = async () => {
    const result = await post(`${prefixAuth}/logout`, {});
    if (result) {
        return result;
    }
}

export const postRegister = async (option) => {
    const result = await post(`${prefixAuth}/register`, option);
    if (result) {
        return result;
    }
} 