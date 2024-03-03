import { useEffect, useState } from 'react';
import { Comment } from './Comment';
import './styles/comments.css';
import { useFetchData } from './hooks/useFetchData';

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

    useEffect(() => {
        fetchCommentCount();
    }, [fetchCommentCount, comments]);

    useEffect(() => {
        if (!hidden) {
            fetchComments();
        }
    }, [hidden, fetchComments]);

    return commentCount ? (
        <>
            <button
                className="toggle-comments"
                onClick={() => setHidden(!hidden)}
            >
                {hidden
                    ? `Show comments (${commentCount.count})`
                    : 'Hide comments'}
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
                                <Comment
                                    key={comment._id}
                                    comment={comment}
                                ></Comment>
                            );
                        })}
                    </div>
                ))}
        </>
    ) : (
        <span>{"There's no comments yet"}</span>
    );
}
