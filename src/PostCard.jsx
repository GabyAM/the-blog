import { useEffect, useState } from 'react';

export function PostCard({ id, title, author, summary }) {
    const [commentCount, setCommentCount] = useState(null);

    useEffect(() => {
        async function fetchCommentCount() {
            try {
                const data = await fetch(
                    `https://odin-blog-api-beta.vercel.app/post/${id}/comments/count`
                );
                const commentCount = await data.json();
                setCommentCount(commentCount.count);
            } catch (e) {
                throw new Error(e);
            }
        }
        fetchCommentCount();
    }, [id]);

    return (
            <div className="post-card">
                <div className="post-card-text flex-col">
                    <div>
                        <h2 className="title-primary">{title}</h2>
                        <span>By {author}</span>
                    </div>
                    <p>{summary}</p>
                    <span>
                        {commentCount !== null
                            ? `${commentCount} comments`
                            : 'Unable to load comments'}
                    </span>
                </div>
                <div className="image-container">
                    <img></img>
                </div>
            </div>
    );
}
