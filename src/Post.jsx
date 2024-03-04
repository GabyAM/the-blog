import { useLoaderData } from 'react-router-dom';
import { Header } from './Header';
import './styles/post.css';
import { Comments } from './Comments';

export function Post() {
    const post = useLoaderData();
    return (
        <>
            <Header></Header>
            <div className="container post-container flex-col">
                <div className="post flex-col">
                    <h1 className="title-primary">{post.title}</h1>
                    <p>{post.text}</p>
                </div>
            </div>
            <div className="horizontal-separator"></div>
            <div className="container flex-col">
                <Comments postId={post._id}></Comments>
            </div>
        </>
    );
}
