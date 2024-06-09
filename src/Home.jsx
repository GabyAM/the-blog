import './styles/home.css';
import { Link } from 'react-router-dom';
import { RecentPosts } from './RecentPosts';

export function Home() {
    return (
        <>
            <div className="hero flex-col">
                <div className="container flex-col">
                    <a href="/login">Login</a>
                    <div className="hero-main-content flex-col">
                        <div className="hero-text flex-col">
                            <div className="logo">
                                <img src="/logo.png"></img>
                            </div>
                            <h1 className="title-primary">
                                This is a headline
                            </h1>
                        </div>
                        <Link to={'/posts'} className="posts-link">
                            <button className="large rounded">Read</button>
                        </Link>
                    </div>
                </div>
            </div>
            <main className="flex-col">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <RecentPosts></RecentPosts>
            </main>
            <footer>
                <div className="container">
                    <div className="logo">
                        <img src="/logo.png"></img>
                    </div>
                    <nav className="flex-col">
                        <h2>Repositories</h2>
                        <ul className="flex-col">
                            <a href="https://github.com/GabyAM/odin-blog">
                                <li>Blog</li>
                            </a>
                            <a href="https://github.com/GabyAM/odin-blog-api">
                                <li>API</li>
                            </a>
                            <a href="/">
                                <li>Admin dashboard</li>
                            </a>
                        </ul>
                    </nav>
                </div>
            </footer>
        </>
    );
}
