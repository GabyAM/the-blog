import { useEffect, useState } from 'react';
import { Header } from './Header';
import { PostCard } from './PostCard';
import './styles/posts.css';
import { useFetchData } from './hooks/useFetchData';
import { PostCardSkeleton } from './PostCardSkeleton';
import { usePagination } from './hooks/usePagination';

export function Posts() {
    const {
        results: posts,
        loading,
        error,
        fetchNextPage,
        loadingNextPage,
        nextPageError
    } = usePagination('https://odin-blog-api-beta.vercel.app/published_posts');

    useEffect(() => {
        function handleScroll() {
            if (
                window.innerHeight + window.scrollY + 1 >=
                document.body.offsetHeight
            ) {
                fetchNextPage();
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetchNextPage]);

    return (
        <>
            <Header sticky={true}></Header>
            <div className="posts container">
                <div className="search-bar"></div>
                <div className="posts flex-col">
                    {loading ? (
                        <>
                            <PostCardSkeleton></PostCardSkeleton>
                            <PostCardSkeleton></PostCardSkeleton>
                            <PostCardSkeleton></PostCardSkeleton>
                        </>
                    ) : (
                        <>
                            {posts.map((post) => (
                                <PostCard
                                    key={post._id}
                                    id={post._id}
                                    title={post.title}
                                    author={post.author}
                                    summary={post.summary}
                                    commentCount={post.comment_count}
                                ></PostCard>
                            ))}
                            {loadingNextPage && (
                                <PostCardSkeleton></PostCardSkeleton>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
