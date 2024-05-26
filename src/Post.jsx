import { useParams } from 'react-router-dom';
import { Header } from './Header';
import './styles/post.css';
import { Comments } from './Comments';
import { useFetchData } from './hooks/useFetchData';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { PostSkeleton } from './PostSkeleton';

export function Post(props) {
    const { id } = useParams();
    const {
        data: post,
        loading,
        error,
        fetchData: fetchPost
    } = useFetchData(`http://localhost:3000/post/${id}`);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);
    return (
        <>
            <Header></Header>
            {error ? (
                <>
                    <h1> Oops</h1>
                    <p>
                        {
                            "Couldn't find the resource or doesn't exist (error screen to be implemented)"
                        }
                    </p>
                </>
            ) : loading ? (
                <PostSkeleton></PostSkeleton>
            ) : (
                <>
                    <div className="container post-container flex-col">
                        <div className="post flex-col">
                            <div className="headings flex-col">
                                <h1 className="title-primary">{post.title}</h1>
                                <p> {post.summary}</p>
                            </div>

                            <div className="image-container">
                                <img
                                    src={`http://localhost:3000${post.image}`}
                                ></img>
                            </div>

                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.text
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="horizontal-separator"></div>
                    <div className="container flex-col">
                        <Comments
                            postId={id}
                            count={post.comment_count}
                        ></Comments>
                    </div>
                </>
            )}
        </>
    );
}
