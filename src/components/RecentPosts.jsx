import { Link } from 'react-router-dom';
import '../styles/recentposts.css';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { RecentPostSkeleton } from './RecentPostSkeleton';
import { SectionError } from './SectionError';
import he from 'he';
import postThumbnailPlaceholder from '../assets/post_thumbnail_placeholder.png';
import { fetchRecentPosts } from '../api/post';
import { IMAGES_URL } from '../constants';

export function RecentPosts() {
    const {
        data: posts,
        isLoading,
        error
    } = useQuery({
        queryKey: ['landing_recent_posts'],
        queryFn: fetchRecentPosts,
        select: (posts) =>
            posts.map((post) => ({
                ...post,
                title: he.unescape(post.title),
                summary: he.unescape(post.summary)
            }))
    });
    return (
        <div className="recent-posts-section">
            <h2>Recent posts</h2>
            <div className="recent-posts">
                {isLoading ? (
                    <>
                        <RecentPostSkeleton></RecentPostSkeleton>
                        <RecentPostSkeleton></RecentPostSkeleton>
                        <RecentPostSkeleton></RecentPostSkeleton>
                    </>
                ) : error ? (
                    <SectionError></SectionError>
                ) : (
                    posts?.map((post, index) => (
                        <React.Fragment key={post._id}>
                            <div
                                className={`recent-post variant-${Math.floor(Math.random() * 3) + 1}`}
                            >
                                <Link to={`/post/${post._id}`}>
                                    <div className="image-container">
                                        <img
                                            src={
                                                post.image ===
                                                'post_thumbnail_placeholder.png'
                                                    ? postThumbnailPlaceholder
                                                    : IMAGES_URL + post.image
                                            }
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
                    ))
                )}
                <Link to={'/posts'} className="posts-link">
                    <button className="large outlined-button-900 rounded">
                        See all posts
                    </button>
                </Link>
            </div>
        </div>
    );
}
