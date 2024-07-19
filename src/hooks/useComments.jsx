import {
    useInfiniteQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { mapPagesResults } from '../utils/map';
import he from 'he';

export function useComments(
    parentId,
    count,
    fetchFn,
    submitFn,
    enabled = true
) {
    const {
        data: comments,
        isLoading,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: [`${parentId}_comments`],
        queryFn: ({ pageParam }) => {
            if (enabled) return fetchFn(pageParam, parentId);
        },
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.metadata.nextPageParams,
        enabled: enabled,
        select: (comments) =>
            mapPagesResults(comments, (comment) => ({
                ...comment,
                text: he.unescape(comment.text),
                user: comment.user
                    ? { ...comment.user, name: he.unescape(comment.user.name) }
                    : null
            }))
    });

    const { encodedToken, token: currentUser } = useAuth();
    const queryClient = useQueryClient();

    const [fetchedCount, setFetchedCount] = useState(
        comments?.pages?.reduce(
            (acc, page) => ((acc += page.results.length), 0)
        ) || 0
    );
    const [totalCount, setTotalCount] = useState(count);
    useEffect(() => {
        if (comments && comments.pages) {
            setFetchedCount(
                comments.pages.reduce(
                    (acc, page) => (acc += page.results.length),
                    0
                )
            );
        }
    }, [comments]);

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
            setTotalCount((prev) => prev + 1);
        }
    });

    function addComment(formData) {
        return mutation.mutateAsync(formData);
    }

    return {
        comments,
        fetchedCount,
        totalCount,
        isLoading,
        error,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        addComment
    };
}
