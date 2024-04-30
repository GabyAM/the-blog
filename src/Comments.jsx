import { useEffect, useState } from 'react';
import { Comment } from './Comment';
import './styles/comments.css';
import { SendComment } from './SendComment';
import { CaretIcon } from './Icons';
import { useAuth } from './hooks/useAuth';
import { usePagination } from './hooks/usePagination';
import { CommentSkeleton } from './CommentSkeleton';
import toast from 'react-hot-toast';

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
    const { token, encodedToken } = useAuth();
    const [isSending, setIsSending] = useState(false);
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

    function handleCommentSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const text = formData.get('comment-text');
        setIsSending(true);
        const promise = fetch(`http://localhost:3000/post/${postId}/comments`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `bearer ${encodedToken}`
            },
            body: JSON.stringify({ text })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('');
                }
                return res.json();
            })
            .then((data) => {
                const comment = data.comment;
                setComments((prevComments) => [comment, ...prevComments]);
            })
            .catch((e) => {
                throw new Error("Couldn't submit comment");
            })
            .finally(() => setIsSending(false));

        toast.promise(promise, {
            loading: 'Submitting comment...',
            success: 'Comment submitted',
            error: (error) => error.message
        });
    }
    return (
        <div className="comment-section flex-col">
            {!loading && (
                <SendComment
                    disabled={token === null}
                    pending={isSending}
                    postId={postId}
                    onSubmit={handleCommentSubmit}
                ></SendComment>
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
