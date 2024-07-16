import React, { useEffect, useState } from 'react';
import { Comment } from './Comment';
import '../styles/comments.css';
import { CommentForm } from './CommentForm';
import { CaretIcon } from './Icons';
import { useAuth } from '../hooks/useAuth';
import { CommentSkeleton } from './CommentSkeleton';
import { useComments } from '../hooks/useComments';
import { fetchPostComments, submitPostComment } from '../api/comment';

export function Comments({ postId, count }) {
    const {
        comments,
        totalCount: commentCount,
        isLoading,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        addComment
    } = useComments(postId, count, fetchPostComments, submitPostComment);

    const [hidden, setHidden] = useState(true);
    const { encodedToken } = useAuth();
    useEffect(() => {
        function handleScroll() {
            if (
                !hidden &&
                window.innerHeight + window.scrollY + 1 >=
                    document.body.offsetHeight
            ) {
                if (!isFetchingNextPage) {
                    fetchNextPage();
                }
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetchNextPage, isFetchingNextPage, hidden]);

    return (
        <div className="comment-section flex-col">
            {!isLoading && (
                <div>
                    <h2
                        className={`main-comment-form-title ${encodedToken === null ? 'disabled' : ''}`}
                    >
                        Add a comment
                    </h2>
                    <CommentForm
                        disabled={encodedToken === null}
                        postId={postId}
                        onSubmit={addComment}
                    ></CommentForm>
                </div>
            )}
            <div>
                {isLoading ? (
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
                                    ? `Show comments (${commentCount})`
                                    : 'Hide comments'}
                            </span>
                        </button>
                        {!hidden && (
                            <div className="comments flex-col">
                                {comments.pages.map((page, index) => (
                                    <React.Fragment key={index}>
                                        {page.results.map((comment) => (
                                            <div
                                                className="flex-col"
                                                key={comment._id}
                                            >
                                                <Comment
                                                    comment={comment}
                                                ></Comment>
                                                <div className="horizontal-separator"></div>
                                            </div>
                                        ))}
                                    </React.Fragment>
                                ))}
                                {isFetchingNextPage && (
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
