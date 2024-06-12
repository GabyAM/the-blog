import { Link } from 'react-router-dom';
import '../styles/recentposts.css';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export function RecentPosts() {
    function fetchRecentPosts() {
        return fetch('http://localhost:3000/posts?is_published=true&limit=3')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('asnfpasf');
                }
                return res.json();
            })
            .then((response) => response.results);
    }

    const {
        data: posts,
        isLoading,
        error
    } = useQuery({
        queryKey: ['landing_recent_posts'],
        queryFn: fetchRecentPosts
    });

    if (isLoading) {
        return <p> loading recent posts...</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }
    return (
        <div className="recent-posts-section">
            <h2>Recent posts</h2>
            <div className="recent-posts">
                {posts.map((post, index) => (
                    <React.Fragment key={post._id}>
                        <div
                            className={`recent-post variant-${Math.floor(Math.random() * 3) + 1}`}
                        >
                            <Link to={`/post/${post._id}`}>
                                <div className="image-container">
                                    <img
                                        src={`http://localhost:3000${post.image}`}
                                    ></img>
                                </div>
                            </Link>
                            <div className="post-text flex-col">
                                <Link to={`/post/${post._id}`}>
                                    <h3 className="title-primary">
                                        {post.title}
                                    </h3>
                                </Link>
                                <p>{post.summary}</p>
                            </div>
                        </div>
                        {index < posts.length - 1 && (
                            <div className="horizontal-separator"></div>
                        )}
                    </React.Fragment>
                ))}
                <Link to={'/posts'} className="posts-link">
                    <button className="large outlined-button-900 rounded">
                        See all posts
                    </button>
                </Link>
            </div>
        </div>
    );
}
