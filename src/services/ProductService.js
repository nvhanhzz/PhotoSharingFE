import { Delete, get, patch, post } from "../utils/request";

export const getListProduct = async () => {
    const result = await get("products");
    if (result) {
        return result;
    }
}

export const createProduct = async (option) => {
    const result = await post("products", option);
    if (result) {
        return result;
    }
}

export const editProduct = async (option, id) => {
    const result = await patch(`products/${id}`, option);
    if (result) {
        return result;
    }
}

export const deleteProduct = async (id) => {
    const result = await Delete(`products/${id}`);
    if (result) {
        return result;
    }
}