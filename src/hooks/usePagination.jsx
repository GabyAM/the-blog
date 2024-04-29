import { useEffect, useState } from 'react';

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include'
};
export function usePagination(url, limit = 10) {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingNextPage, setLoadingNextPage] = useState(false);
    const [nextPageError, setNextPageError] = useState(null);
    const [nextPageParams, setNextPageParams] = useState(null);
    const [count, setCount] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch(
                    `${url}${url.includes('?') ? '&' : '?'}limit=${limit}`,
                    options
                );
                if (!response.ok) {
                    throw new Error('data fetch failed');
                }
                const data = await response.json();
                setResults(data.results);
                setNextPageParams(data.metadata.nextPageParams);
                setCount(data.metadata.count);
            } catch (e) {
                setError(e);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url, limit]);

    async function fetchNextPage() {
        if (!nextPageParams) {
            return;
        }
        setLoadingNextPage(true);
        try {
            const response = await fetch(
                `${url}${url.includes('?') ? '&' : '?'}lastId=${nextPageParams._id}&lastCreatedAt=${nextPageParams.createdAt}&limit=${limit}`,
                options
            );
            if (!response.ok) {
                throw new Error('data fetch failed');
            }
            const data = await response.json();
            setResults((prev) => [...prev, ...data.results]);
            setNextPageParams(data.metadata.nextPageParams);
        } catch (e) {
            setNextPageError(e);
            setResults([]);
        } finally {
            setLoadingNextPage(false);
        }
    }

    return {
        results,
        setResults,
        count,
        loading,
        error,
        fetchNextPage,
        hasNextPage: nextPageParams !== null,
        loadingNextPage,
        nextPageError
    };
}
