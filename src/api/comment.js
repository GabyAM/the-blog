export function fetchPostComments(pageParam, postId) {
    let url = `http://localhost:3000/post/${postId}/comments`;
    if (pageParam)
        url += `?lastId=${pageParam._id}&lastCreatedAt=${pageParam.createdAt}`;
    return fetch(url).then((res) => res.json());
}

export function fetchComment(id) {
    return fetch(`http://localhost:3000/comment/${id}`).then((res) => {
        if (!res.ok) {
            throw new Error('');
        }
        return res.json();
    });
}

export function fetchCommentReplies(pageParam, commentId) {
    let url = `http://localhost:3000/comment/${commentId}/comments`;
    if (pageParam)
        url += `?lastId=${pageParam._id}&lastCreatedAt=${pageParam.createdAt}`;
    return fetch(url).then((res) => {
        if (!res.ok) {
            throw new Error('');
        }
        return res.json();
    });
}

function submitComment(formData, parentId, token, type) {
    return fetch(`http://localhost:3000/${type}/${parentId}/comments`, {
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
