import { useEffect, useState } from 'react';
import { Comment } from './Comment';
import './styles/comments.css';
import { CommentForm } from './CommentForm';
import { CaretIcon } from './Icons';
import { useAuth } from './hooks/useAuth';
import { usePagination } from './hooks/usePagination';
import { CommentSkeleton } from './CommentSkeleton';
import toast from 'react-hot-toast';
import { CommentTreeProvider } from './context/commentTree';
import { addReply } from './utilities/comment';

export function Comments({ postId }) {
    const {
        results: comments,
        setResults: setComments,
        count,
        loading,
        error,
        fetchNextPage,
        loadingNextPage,
        nextPageError
    } = usePagination(`http://localhost:3000/post/${postId}/comments`);
    const [hidden, setHidden] = useState(true);
    const { token: currentUser, encodedToken } = useAuth();
    useEffect(() => {
        function handleScroll() {
            if (
                !hidden &&
                window.innerHeight + window.scrollY + 1 >=
                    document.body.offsetHeight
            ) {
                if (!loadingNextPage) {
                    fetchNextPage();
                }
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetchNextPage, loadingNextPage, hidden]);

    function handleCommentSubmit(formData, parentCommentId) {
        const url = parentCommentId
            ? `comment/${parentCommentId}/comments`
            : `post/${postId}/comments`;

        return fetch(`http://localhost:3000/${url}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `bearer ${encodedToken}`
            },
            body: JSON.stringify(formData)
        })
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
                if (parentCommentId) {
                    setComments((prevComments) =>
                        addReply(prevComments, parentCommentId, newComment)
                    );
                } else {
                    setComments((prevComments) => [
                        newComment,
                        ...prevComments
                    ]);
                }
            })
            .catch((e) => {
                throw new Error("Couldn't submit comment");
            });
    }
    return (
        <div className="comment-section flex-col">
            {!loading && (
                <div>
                    <h2
                        className={`main-comment-form-title ${encodedToken === null ? 'disabled' : ''}`}
                    >
                        Add a comment
                    </h2>
                    <CommentForm
                        disabled={encodedToken === null}
                        postId={postId}
                        onSubmit={handleCommentSubmit}
                    ></CommentForm>
                </div>
            )}
            <div>
                {loading ? (
                    <>
                        <CommentSkeleton></CommentSkeleton>
                        <CommentSkeleton></CommentSkeleton>
                        <CommentSkeleton></CommentSkeleton>
                    </>
                ) : (
                    <>
                        <button
                            className="toggle-comments"
                            onClick={() => setHidden(!hidden)}
                        >
                            <CaretIcon
                                width={32}
                                height={32}
                                orient={hidden ? 'down' : 'up'}
                            ></CaretIcon>
                            <span>
                                {hidden
                                    ? `Show comments (${count})`
                                    : 'Hide comments'}
                            </span>
                        </button>
                        {!hidden && (
                            <div className="comments flex-col">
                                <CommentTreeProvider
                                    submitReply={handleCommentSubmit}
                                >
                                    {comments.map((comment) => {
                                        return (
                                            <div
                                                className="flex-col"
                                                key={comment._id}
                                            >
                                                <Comment
                                                    key={comment._id}
                                                    comment={comment}
                                                ></Comment>
                                                <div className="horizontal-separator"></div>
                                            </div>
                                        );
                                    })}
                                </CommentTreeProvider>
                                {loadingNextPage && (
                                    <CommentSkeleton></CommentSkeleton>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
