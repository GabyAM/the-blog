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
        </>
    );
}
