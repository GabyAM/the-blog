export function Home() {
    return (
        <>
            <div className="hero flex-col">
                <a href="/login">Login</a>
                <div className="hero-main-content flex-col">
                    <div className="hero-text flex-col">
                        <h2>The blog</h2>
                        <h1 className="title-primary">This is a headline</h1>
                    </div>
                    <button>Read</button>
                </div>
            </div>
            <main className="flex-col">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="featured-posts flex-col">
                    <h2 className="title-primary">Featured posts</h2>
                    <div>
                        <div className="featured-posts-grid">
                            <div className="featured-post main-post">
                                <div className="post-text flex-col">
                                    <h3 className="title-primary">
                                        How i made this blog
                                    </h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                                <div className="image-container">
                                    <img src=""></img>
                                </div>
                            </div>
                            <div className="featured-post">
                                <div className="post-text flex-col">
                                    <h3 className="title-primary">
                                        Post title
                                    </h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                            </div>
                            <div className="featured-post">
                                <div className="post-text flex-col">
                                    <h3 className="title-primary">
                                        Post title
                                    </h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="rounded-button inverted">
                        See all posts
                    </button>
                </div>
            </main>
        </>
    );
}
