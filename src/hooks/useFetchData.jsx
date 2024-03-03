import { useCallback, useState } from 'react';

export function useFetchData(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('data fetch failed');
            }
            const newData = await response.json();
            setData(newData);
        } catch (e) {
            setError(e);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [url]);

    return { data, loading, error, fetchData };
}
