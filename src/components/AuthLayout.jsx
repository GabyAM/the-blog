import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import '../styles/authlayout.css';
import { useAuth } from '../hooks/useAuth';

export function AuthLayout() {
    const location = useLocation();
    const { token, loading } = useAuth();
    if (loading) return;
    if (token) {
        return <Navigate to="/posts"></Navigate>;
    }
    return (
        <>
            <div className="user-form-layout">
                <div className="user-form-section">
                    <div className="user-form-container flex-col">
                        <h1 className="title-primary">Welcome</h1>
                        <nav>
                            <ul className="method-tabs flex-row">
                                <li
                                    className={
                                        location.pathname === '/login'
                                            ? 'selected'
                                            : ''
                                    }
                                >
                                    <Link to="/login">Log in</Link>
                                </li>
                                <li
                                    className={
                                        location.pathname === '/signup'
                                            ? 'selected'
                                            : ''
                                    }
                                >
                                    <Link to="/signup">Sign up</Link>
                                </li>
                                <div
                                    className={`tab-highlight ${location.pathname === '/signup' ? 'right' : ''}`}
                                ></div>
                            </ul>
                        </nav>
                        <Outlet></Outlet>
                    </div>
                </div>
                <div className="user-form-background">
                    <h1 className="title-primary">Read about everything.</h1>
                </div>
            </div>
        </>
    );
}
