import { useEffect, useState } from 'react';
import { Header } from './Header';
import { PostCard } from './PostCard';
import './styles/posts.css';

export function Posts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    'https://odin-blog-api-beta.vercel.app/published_posts'
                );
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                throw new Error(err);
            }
        }
        fetchData();
    }, []);

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
                        ></PostCard>
                    ))}
                </div>
            </div>
        </>
    );
}
