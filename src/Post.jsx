import { useParams } from 'react-router-dom';
import { Header } from './Header';
import './styles/post.css';
import { Comments } from './Comments';
import { useFetchData } from './hooks/useFetchData';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

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
                        {' '}
                        {
                            "Couldn't find the resource or doesn't exist (error screen to be implemented)"
                        }
                    </p>
                </>
            ) : (
                <>
                    <div className="container post-container flex-col">
                        <div className="post flex-col">
                            <h1 className="title-primary">
                                {(post && post.title) || <Skeleton count={2} />}
                            </h1>
                            <p>
                                {(post && post.text) || (
                                    <Skeleton count={10}></Skeleton>
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="horizontal-separator"></div>
                    <div className="container flex-col">
                        <Comments postId={id}></Comments>
                    </div>
                </>
            )}
        </>
    );
}
