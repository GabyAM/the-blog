import { useParams } from 'react-router-dom';
import { useFetchData } from './hooks/useFetchData';
import { useEffect } from 'react';
import { Header } from './Header';
import { Comment } from './Comment';
import { useAuth } from './hooks/useAuth';
import { CommentTreeProvider } from './context/commentTree';
import { addReply } from './utilities/comment';

function addReplyToComment(comment, parentCommentId, newComment) {
    if (comment._id === parentCommentId) {
        return {
            ...comment,
            comments: [newComment, ...comment.comments]
        };
    } else if (comment.comments?.length > 0)
        return {
            ...comment,
            comments: addReply(comment.comments, parentCommentId, newComment)
        };
    else return comment;
}

export function CommentDetail() {
    const { id } = useParams();

    const { token: currentUser, encodedToken } = useAuth();
    const {
        data: comment,
        setData: setComment,
        loading,
        error,
        fetchData
    } = useFetchData(`http://localhost:3000/comment/${id}`);

    function handleCommentSubmit(formData, parentCommentId) {
        return fetch(
            `http://localhost:3000/comment/${parentCommentId}/comments`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${encodedToken}`
                },
                body: JSON.stringify(formData)
            }
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error('');
                }
                return res.json();
            })
            .then((data) => {
                const newComment = data.comment;
                const { id, ...rest } = currentUser;
                const newUser = { _id: id, ...rest };
                newComment.user = newUser;
                setComment((prevComment) =>
                    addReplyToComment(prevComment, parentCommentId, newComment)
                );
            })
            .catch((e) => {
                throw new Error("Couldn't submit comment");
            });
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    return (
        <>
            <Header></Header>
            {!loading && (
                <div className="container comment-detail-container flex-col">
                    <div className="small-post-card">
                        <div className="image-container">
                            <img
                                src={`http://localhost:3000${comment.post.image}`}
                            ></img>
                        </div>
                        <div className="text-section flex-col">
                            <h2 className="title-primary">
                                {comment.post.title}
                            </h2>
                            <p>{comment.post.summary}</p>
                        </div>
                    </div>
                    <div className="horizontal-separator"></div>
                    <div className="comments flex-col">
                        <CommentTreeProvider submitReply={handleCommentSubmit}>
                            <Comment comment={comment}></Comment>
                        </CommentTreeProvider>
                    </div>
                </div>
            )}
        </>
    );
}
