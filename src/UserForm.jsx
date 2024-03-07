import { Outlet, Link, useLocation } from 'react-router-dom';
import './styles/login.css';

export function UserForm() {
    const location = useLocation();
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
