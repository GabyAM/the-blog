import { useEffect, useState } from 'react';
import { Comment } from './Comment';
import './styles/comments.css';

export function Comments({ postId }) {
    const [hidden, setHidden] = useState(true);
    const [commentCount, setCommentCount] = useState(null);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        async function fetchCommentCount() {
            try {
                const data = await fetch(
                    `https://odin-blog-api-beta.vercel.app/post/${postId}/comments/count`
                );
                const commentCount = await data.json();
                setCommentCount(commentCount.count);
            } catch (e) {
                throw new Error(e);
            }
        }
        fetchCommentCount();
    }, [postId]);
    useEffect(() => {
        async function fetchComments() {
            const data = await fetch(
                `https://odin-blog-api-beta.vercel.app/post/${postId}/comments`
            );
            const comments = await data.json();
            setComments(comments);
        }
        if (!hidden) {
            fetchComments();
        }
    }, [hidden, postId]);
    return commentCount ? (
        <>
            <button
                className="toggle-comments"
                onClick={() => setHidden(!hidden)}
            >
                {hidden ? `Show comments (${commentCount})` : 'Hide comments'}
            </button>
            {!hidden && (
                <div className="comments flex-col">
                    {comments.map((comment) => {
                        return (
                            <Comment
                                key={comment.id}
                                comment={comment}
                            ></Comment>
                        );
                    })}
                </div>
            )}
        </>
    ) : (
        <span>{"There's no comments yet"}</span>
    );
}
