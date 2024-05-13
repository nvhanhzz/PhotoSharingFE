import { Delete, get, patch, post } from "../utils/request";
const prefixComment = "api/comment";

export const postNewComment = async (option) => {
    const result = await post(`${prefixComment}/new`, option);
    if (result) {
        return result;
    }
}