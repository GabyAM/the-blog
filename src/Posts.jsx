import { useEffect, useState } from 'react';
import { Header } from './Header';
import { PostCard } from './PostCard';
import './styles/posts.css';
import { useFetchData } from './hooks/useFetchData';

export function Posts() {
    const {
        data: posts,
        loading,
        error,
        fetchData: fetchPosts
    } = useFetchData('https://odin-blog-api-beta.vercel.app/published_posts');

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);
    return (
        <>
            <Header></Header>
            <div className="posts container">
                <div className="search-bar"></div>
                <div className="posts flex-col">
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            id={post._id}
                            title={post.title}
                            author={post.author}
                            summary={post.summary}
                            commentCount={post.comment_count}
                        ></PostCard>
                    ))}
                </div>
            </div>
        </>
    );
}
