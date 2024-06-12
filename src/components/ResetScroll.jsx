import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export function ResetScroll() {
    const { pathname } = useLocation();

    useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, [pathname]);

    return <Outlet></Outlet>;
}
