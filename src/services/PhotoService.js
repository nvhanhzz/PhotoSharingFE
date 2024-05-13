import { Delete, get, patch, postFile } from "../utils/request";
const prefixPhoto = "api/photo";

export const getPhotosOfUser = async (userID) => {
    const result = await get(`${prefixPhoto}/photosOfUser/${userID}`);
    if (result) {
        return result;
    }
}

export const getPhotoById = async (photoId) => {
    const result = await get(`${prefixPhoto}/${photoId}`);
    if (result) {
        return result;
    }
}

export const postNewPhoto = async (option) => {
    const result = await postFile(`${prefixPhoto}/new`, option);
    if (result) {
        return result;
    }
}