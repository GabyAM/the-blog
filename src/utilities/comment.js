export function addReply(comments, parentCommentId, newComment) {
    return comments.map((comment) => {
        if (comment._id === parentCommentId) {
            return {
                ...comment,
                comments: [newComment, ...comment.comments]
            };
        } else if (comment.comments?.length > 0)
            return {
                ...comment,
                comments: addReply(
                    comment.comments,
                    parentCommentId,
                    newComment
                )
            };
        else return comment;
    });
}
