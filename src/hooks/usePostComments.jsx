import {
    useInfiniteQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { useState } from 'react';

function fetchComments(pageParam, postId) {
    let url = `http://localhost:3000/post/${postId}/comments`;
    if (pageParam)
        url += `?lastId=${pageParam._id}&lastCreatedAt=${pageParam.createdAt}`;
    return fetch(url).then((res) => res.json());
}

export function usePostComments(postId, count) {
    const {
        data: comments,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: [`${postId}_comments`],
        queryFn: ({ pageParam }) => fetchComments(pageParam, postId),
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.metadata.nextPageParams
    });

    const [commentCount, setCommentCount] = useState(count);

    const { encodedToken, token: currentUser } = useAuth();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['submitComment'],
        mutationFn: (formData) => {
            return fetch(`http://localhost:3000/post/${postId}/comments`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${encodedToken}`
                },
                body: JSON.stringify(formData)
            }).then((res) => {
                if (!res.ok) {
                    throw new Error('');
                }
                return res.json();
            });
        },
        onSuccess: (data) => {
            const newComment = data.comment;
            const { id, ...rest } = currentUser;
            const newUser = { _id: id, ...rest };
            newComment.user = newUser;
            queryClient.setQueryData([`${postId}_comments`], (prevComments) => {
                prevComments.pages[0] = {
                    ...prevComments.pages[0],
                    results: [newComment, ...prevComments.pages[0].results]
                };
            });
            setCommentCount((prev) => prev + 1);
        }
    });

    function addComment(formData) {
        return mutation.mutateAsync(formData);
    }

    return {
        comments,
        commentCount,
        status,
        error,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        addComment
    };
}
