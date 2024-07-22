import API_URL from '../constants.js';

export function submitLogin(formData) {
    return fetch(API_URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
    }).then((res) => {
        if (!res.ok && res.status !== 400) {
            throw new Error('');
        }
        return res.json();
    });
}

export function submitSignup(formData, token) {
    return fetch(API_URL + '/user', {
        method: 'POST',
        credentials: 'include',
        headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then((res) => {
        if (!res.ok && res.status === 500) {
            throw new Error('');
        }
        return res.json();
    });
}
