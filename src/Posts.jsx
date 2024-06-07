import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { PostCard } from './PostCard';
import './styles/posts.css';
import { useFetchData } from './hooks/useFetchData';
import { PostCardSkeleton } from './PostCardSkeleton';
import { usePagination } from './hooks/usePagination';
import { useInfiniteQuery } from '@tanstack/react-query';

export function Posts() {
    function fetchPosts({ pageParam }) {
        let url = 'http://localhost:3000/posts?is_published=true';
        if (pageParam)
            url += `&lastId=${pageParam._id}&lastCreatedAt=${pageParam.createdAt}`;
        return fetch(url).then((res) => res.json());
    }
    const {
        data: posts,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
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
                if (!isFetchingNextPage) {
                    fetchNextPage();
                }
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetchNextPage, isFetchingNextPage]);

    return (
        <>
            <Header sticky={true}></Header>
            <div className="posts container">
                <div className="search-bar"></div>
                <div className="posts flex-col">
                    {status === 'pending' ? (
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
                                            commentCount={post.comment_count}
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
        </>
    );
}
