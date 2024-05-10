import { Delete, get, patch, post } from "../utils/request";
const prefixPhoto = "api/photo";

export const getPhotosOfUser = async (userID) => {
    const result = await get(`${prefixPhoto}/photosOfUser/${userID}`);
    if (result) {
        return result;
    }
}