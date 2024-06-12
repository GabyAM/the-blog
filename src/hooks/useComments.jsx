import {
    useInfiniteQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import { useState } from 'react';
import { useAuth } from './useAuth';

export function useComments(
    parentId,
    count,
    fetchFn,
    submitFn,
    enabled = true
) {
    const {
        data: comments,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: [`${parentId}_comments`],
        queryFn: ({ pageParam }) => {
            if (enabled) return fetchFn(pageParam, parentId);
        },
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.metadata.nextPageParams,
        enabled: enabled
    });

    const [commentCount, setCommentCount] = useState(count);

    const { encodedToken, token: currentUser } = useAuth();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: [`${parentId}_submit_comment`],
        mutationFn: (formData) => submitFn(formData, parentId, encodedToken),
        onSuccess: (data) => {
            const newComment = data.comment;
            const { id, ...rest } = currentUser;
            const newUser = { _id: id, ...rest };
            newComment.user = newUser;
            queryClient.setQueryData(
                [`${parentId}_comments`],
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
