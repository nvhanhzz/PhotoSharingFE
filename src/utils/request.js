const DOMAIN = "http://localhost:8081/";

export const get = async (path) => {
    const response = await fetch(DOMAIN + path, {
        method: 'GET',
        credentials: 'include'
    });
    if (response) {
        return response;
    }
}

export const post = async (path, option) => {
    const response = await fetch(DOMAIN + path, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(option)
    });
    return response;
}

export const postFile = async (path, option) => {
    const response = await fetch(DOMAIN + path, {
        method: 'POST',
        credentials: 'include',
        body: option
    });
    return response;
}

export const patch = async (path, option) => {
    const response = await fetch(DOMAIN + path, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(option)
    });
    return response;
}

export const del = async (path) => {
    const response = await fetch(DOMAIN + path, {
        method: 'DELETE',
        credentials: 'include'
    });
    return response;
}
