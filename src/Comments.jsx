import { useEffect, useState } from 'react';
import { Comment } from './Comment';
import './styles/comments.css';
import { SendComment } from './SendComment';
import { useFetchData } from './hooks/useFetchData';
import { CaretIcon } from './Icons';
import { useAuth } from './hooks/useAuth';

export function Comments({ postId }) {
    const {
        data: comments,
        loading,
        error,
        fetchData: fetchComments
    } = useFetchData(
        `https://odin-blog-api-beta.vercel.app/post/${postId}/comments`
    );
    const { data: commentCount, fetchData: fetchCommentCount } = useFetchData(
        `https://odin-blog-api-beta.vercel.app/post/${postId}/comments/count`
    );
    const [hidden, setHidden] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        fetchCommentCount();
    }, [fetchCommentCount, comments]);

    useEffect(() => {
        if (!hidden) {
            fetchComments();
        }
    }, [hidden, fetchComments]);

    return (
        <div className="comment-section flex-col">
            {commentCount ? (
                <>
                    {token && (
                        <SendComment
                            postId={postId}
                            onSubmit={fetchComments}
                        ></SendComment>
                    )}
                    <div>
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
                                    ? `Show comments (${commentCount.count})`
                                    : 'Hide comments'}
                            </span>
                        </button>
                        {!hidden &&
                            (loading ? (
                                <span>Loading comments...</span>
                            ) : error ? (
                                <span>{error}</span>
                            ) : (
                                <div className="comments flex-col">
                                    {comments.map((comment) => {
                                        return (
                                            <>
                                                <Comment
                                                    key={comment._id}
                                                    comment={comment}
                                                ></Comment>
                                                <div className="horizontal-separator"></div>
                                            </>
                                        );
                                    })}
                                </div>
                            ))}
                    </div>
                </>
            ) : (
                <span>{"There's no comments yet"}</span>
            )}
        </div>
    );
}
