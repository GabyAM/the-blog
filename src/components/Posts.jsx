import React, { useEffect } from 'react';
import { Header } from './Header';
import { PostCard } from './PostCard';
import '../styles/posts.css';
import { PostCardSkeleton } from './PostCardSkeleton';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/post';
import { PageError } from './PageError';

export function Posts() {
    const {
        data: posts,
        isLoading,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam }) => fetchPosts(pageParam),
        initialPageParam: null,
        getNextPageParam: (lastPage) => {
            return lastPage.metadata.nextPageParams;
        }
    });
    useEffect(() => {
        function handleScroll() {
            if (
                window.innerHeight + window.scrollY + 1 >=
                document.body.offsetHeight
            ) {
                if (!isFetchingNextPage && !error) {
                    fetchNextPage();
                }
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetchNextPage, isFetchingNextPage, error]);

    return (
        <>
            <Header sticky={true}></Header>
            {error ? (
                <PageError error={error}></PageError>
            ) : (
                <div className="posts container">
                    <div className="search-bar"></div>
                    <div className="posts flex-col">
                        {isLoading ? (
                            <>
                                <PostCardSkeleton></PostCardSkeleton>
                                <PostCardSkeleton></PostCardSkeleton>
                                <PostCardSkeleton></PostCardSkeleton>
                            </>
                        ) : (
                            <>
                                {posts.pages.map((page, index) => (
                                    <React.Fragment key={index}>
                                        {page.results.map((post) => (
                                            <PostCard
                                                key={post._id}
                                                id={post._id}
                                                title={post.title}
                                                author={post.author}
                                                summary={post.summary}
                                                image={post.image}
                                                commentCount={
                                                    post.comment_count
                                                }
                                            ></PostCard>
                                        ))}
                                    </React.Fragment>
                                ))}
                                {isFetchingNextPage && (
                                    <PostCardSkeleton></PostCardSkeleton>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
