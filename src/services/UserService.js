import { Delete, get, patch, post } from "../utils/request";
const prefixUser = "api/user";

export const getAllUsers = async () => {
    const result = await get(`${prefixUser}/list`);
    if (result) {
        return result;
    }
}

export const getUserByID = async (userID) => {
    const result = await get(`${prefixUser}/${userID}`);
    if (result) {
        return result;
    }
}

export const getUserByJwt = async () => {
    const result = await get(`${prefixUser}/jwt`);
    if (result) {
        return result;
    }
}