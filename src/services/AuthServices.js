import { Delete, get, patch, post } from "../utils/request";
const prefixUser = "api/auth";

export const postLogin = async (option) => {
    const result = await post(`${prefixUser}/login`, option);
    console.log(result);
    if (result) {
        return result;
    }
}