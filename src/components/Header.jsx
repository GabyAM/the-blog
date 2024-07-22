import '../styles/header.css';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import avatarPlaceholder from '../assets/profile.png';

export function Header({ sticky }) {
    const { token: currentUser, removeToken } = useAuth();

    return (
        <header className={sticky ? 'sticky' : ''}>
            <div className="container">
                <Link to="/" className="logo flex-row">
                    <img src="/logo_alternative.png"></img>
                </Link>
                <ul className="header-links flex-row">
                    <li>
                        <a className="header-main-link" href="/">
                            Home
                        </a>
                    </li>
                    <li>
                        <a className="header-main-link" href="/posts">
                            Posts
                        </a>
                    </li>
                </ul>
                <div
                    className={`user-section ${currentUser ? 'logged-in' : ''}`}
                >
                    {currentUser ? (
                        <>
                            <Link
                                to={`/user/${currentUser.id}`}
                                className="header-user-card"
                            >
                                <div className="image-container">
                                    <img
                                        src={
                                            currentUser.image ===
                                            '/images/profile.png'
                                                ? avatarPlaceholder
                                                : `http://localhost:3000${currentUser.image}`
                                        }
                                    ></img>
                                </div>
                                <div className="info-container flex-col">
                                    <span>{currentUser.name}</span>
                                    <span>{currentUser.email}</span>
                                </div>
                            </Link>
                            <button
                                className="user-auth-link outlined-button-900 light-outline small rounded"
                                onClick={() => {
                                    removeToken();
                                }}
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                className="user-auth-link outlined-button-900 small rounded"
                                to="/login"
                            >
                                Login
                            </Link>
                            <Link
                                className="user-auth-link primary-button small rounded"
                                to="/signup"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
