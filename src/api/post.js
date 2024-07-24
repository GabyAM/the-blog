import { ServerError } from '../utils/error';
import { API_URL } from '../constants.js';

export function fetchPost(id) {
    return fetch(API_URL + `/post/${id}`).then((res) => {
        if (!res.ok) {
            throw new ServerError('failed at fetching post', res.status);
        }
        return res.json();
    });
}

export function fetchPosts(pageParam) {
    let url = API_URL + '/posts?is_published=true';
    if (pageParam)
        url += `&lastId=${pageParam._id}&lastCreatedAt=${pageParam.createdAt}`;
    return fetch(url).then((res) => {
        if (!res.ok) {
            throw new ServerError('failed at fetching posts', res.status);
        }
        return res.json();
    });
}

export function fetchRecentPosts() {
    return fetch(API_URL + '/posts?is_published=true&limit=3')
        .then((res) => {
            if (!res.ok) {
                throw new ServerError(
                    'Failed to fetch recent posts',
                    res.status
                );
            }
            return res.json();
        })
        .then((response) => response.results);
}

export function fetchIsPostSaved(postId, token) {
    return fetch(API_URL + `/post/${postId}/saved`, {
        credentials: 'include',
        headers: { Authorization: `bearer ${token}` }
    }).then((res) => {
        if (!res.ok) {
            throw new ServerError('Failed to fetch post status', res.status);
        }
        return res.json();
    });
}

function submitSaveOrUnsavePost(postId, action, token) {
    return fetch(API_URL + `/post/${postId}/${action}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Authorization: `bearer ${token}`
        }
    }).then((res) => {
        if (!res.ok) {
            throw new ServerError(`Failed to ${action} post`, res.status);
        }
        return res.json();
    });
}

export function submitSavePost(postId, token) {
    return submitSaveOrUnsavePost(postId, 'save', token);
}

export function submitUnsavePost(postId, token) {
    return submitSaveOrUnsavePost(postId, 'unsave', token);
}
