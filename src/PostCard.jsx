import { useEffect, useState } from 'react';
import './styles/postcard.css';
import { Link } from 'react-router-dom';

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
                    <Link to={`/post/${id}`}>
                        <h2 className="title-primary">{title}</h2>
                    </Link>
                    <span>
                        By{' '}
                        <a href="#" className="author-link">
                            {author}
                        </a>
                    </span>
                </div>
                <p>{summary}</p>
                <span className="comment-count">
                    {commentCount !== null
                        ? `${commentCount} comments`
                        : 'Unable to load comments'}
                </span>
            </div>
            <Link to={`/post/${id}`}>
                <div className="image-container">
                    <img></img>
                </div>
            </Link>
        </div>
    );
}
