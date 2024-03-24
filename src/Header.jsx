import './styles/header.css';
import { useAuth } from './hooks/useAuth';

export function Header({ sticky }) {
    const { token: currentUser, removeToken } = useAuth();

    return (
        <header className={sticky ? 'sticky' : ''}>
            <div className="container">
                <div className="logo flex-row">
                    <img src="/logo_alternative.png"></img>
                </div>
                <ul className="header-links flex-row">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/posts">Posts</a>
                    </li>
                </ul>
                <div
                    className={`user-section ${currentUser ? 'logged-in' : ''}`}
                >
                    {currentUser ? (
                        <>
                            <div className="header-user-card">
                                <div className="image-container">
                                    <img
                                        src={
                                            currentUser.image ===
                                            '/images/profile.png'
                                                ? '/profile.png'
                                                : `http://localhost:3000${currentUser.image}`
                                        }
                                    ></img>
                                </div>
                                <div className="info-container flex-col">
                                    <span>{currentUser.name}</span>
                                    <span>{currentUser.email}</span>
                                </div>
                            </div>
                            <button
                                className="logout-button"
                                onClick={() => {
                                    removeToken();
                                }}
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/login">Login</a>
                            <a href="/signup">Sign up</a>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
