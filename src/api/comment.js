import { ServerError } from '../utils/error';
import API_URL from '../constants.js';

export function fetchComment(id) {
    return fetch(API_URL + `/comment/${id}`).then((res) => {
        if (!res.ok) {
            throw new ServerError('Failed to fetch comment', res.status);
        }
        return res.json();
    });
}

function fetchComments(pageParam, parentType, parentId) {
    let url = API_URL + `/${parentType}/${parentId}/comments`;
    if (pageParam)
        url += `?lastId=${pageParam._id}&lastCreatedAt=${pageParam.createdAt}`;
    return fetch(url).then((res) => {
        if (!res.ok) {
            throw new ServerError('Failed to fetch comments', res.status);
        }
        return res.json();
    });
}
export function fetchCommentReplies(pageParam, commentId) {
    return fetchComments(pageParam, 'comment', commentId);
}
export function fetchPostComments(pageParam, postId) {
    return fetchComments(pageParam, 'post', postId);
}

function submitComment(formData, parentId, token, type) {
    return fetch(API_URL + `/${type}/${parentId}/comments`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`
        },
        body: JSON.stringify(formData)
    }).then((res) => {
        if (!res.ok) {
            throw new Error('');
        }
        return res.json();
    });
}
export function submitPostComment(formData, postId, token) {
    return submitComment(formData, postId, token, 'post');
}

export function submitCommentReply(formData, commentId, token) {
    return submitComment(formData, commentId, token, 'comment');
}
