import { ServerError } from '../utils/error';
import API_URL from '../constants.js';

export function fetchUser(id, token) {
    const options = {};
    if (token) {
        options.credentials = 'include';
        options.headers = {
            Authorization: `bearer ${token}`
        };
    }
    return fetch(API_URL + `/user/${id}`, options).then((res) => {
        if (!res.ok) {
            throw new ServerError('Failed to fetch user', res.status);
        }
        return res.json();
    });
}

export function submitUserEdit(formData, id, token) {
    return fetch(API_URL + `/user/${id}/update`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Authorization: `bearer ${token}`
        },
        body: formData
    }).then((res) => {
        if (!res.ok) {
            throw new Error('');
        }
        return res.json();
    });
}
