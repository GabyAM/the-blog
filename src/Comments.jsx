import { useEffect, useState } from 'react';
import { Comment } from './Comment';
import './styles/comments.css';
import { SendComment } from './SendComment';
import { CaretIcon } from './Icons';
import { useAuth } from './hooks/useAuth';
import { usePagination } from './hooks/usePagination';
import { CommentSkeleton } from './CommentSkeleton';

export function Comments({ postId }) {
    const {
        results: comments,
        count,
        loading,
        error,
        fetchNextPage,
        loadingNextPage,
        nextPageError
    } = usePagination(`http://localhost:3000/post/${postId}/comments`);
    const [hidden, setHidden] = useState(true);
    const { token } = useAuth();

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

    return (
        <div className="comment-section flex-col">
            {token && (
                <SendComment
                    postId={postId}
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
