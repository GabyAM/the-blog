import {
    useInfiniteQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { useState } from 'react';

function fetchComments(pageParam, commentId) {
    let url = `http://localhost:3000/comment/${commentId}/comments`;
    if (pageParam)
        url += `?lastId=${pageParam._id}&lastCreatedAt=${pageParam.createdAt}`;
    return fetch(url).then((res) => res.json());
}

export function useCommentReplies(commentId, enabled) {
    const {
        data: comments,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: [`${commentId}_replies`],
        queryFn: ({ pageParam }) => {
            if (enabled) {
                return fetchComments(pageParam, commentId);
            }
        },
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.metadata.nextPageParams,
        enabled: enabled
    });

    const { encodedToken, token: currentUser } = useAuth();
    function addCommentReply(formData) {
        return fetch(`http://localhost:3000/comment/${commentId}/comments`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Authorization: `bearer ${encodedToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((res) => {
            if (!res.ok) {
                throw new Error('');
            }
            return res.json();
        });
    }
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: [`${commentId}_add_reply`],
        mutationFn: addCommentReply,
        onSuccess: (data) => {
            const newComment = data.comment;
            const { id, ...rest } = currentUser;
            const newUser = { _id: id, ...rest };
            newComment.user = newUser;
            queryClient.setQueryData(
                [`${commentId}_replies`],
                (prevComments) => {
                    const newComments = prevComments
                        ? { ...prevComments }
                        : {
                              pageParams: [null],
                              pages: [
                                  {
                                      metadata: {
                                          nextPageParams: null
                                      },
                                      results: []
                                  }
                              ]
                          };
                    newComments.pages[0] = {
                        ...newComments.pages[0],
                        results: [newComment, ...newComments.pages[0].results]
                    };
                    return newComments;
                }
            );
        }
    });

    function addReply(formData) {
        return mutation.mutateAsync(formData);
    }

    return {
        comments,
        status,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        addReply
    };
}
