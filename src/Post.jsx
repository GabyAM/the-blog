import { useParams } from 'react-router-dom';
import { Header } from './Header';
import './styles/post.css';
import { Comments } from './Comments';
import { useCallback, useEffect, useState } from 'react';
import { PostSkeleton } from './PostSkeleton';
import { useAuth } from './hooks/useAuth';
import { CheckedBookmarkIcon, UncheckedBookmarkIcon } from './Icons';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import {
    fetchIsPostSaved,
    fetchPost,
    submitSavePost,
    submitUnsavePost
} from './api/post';

export function Post() {
    const { id } = useParams();
    const { encodedToken } = useAuth();

    const fetchFn = useCallback(() => fetchPost(id), [id]);
    const {
        data: post,
        isLoading,
        error
    } = useQuery({
        queryKey: [`post_${id}`],
        queryFn: fetchFn
    });
    const [isSaved, setIsSaved] = useState(false);
    const [isSavingOrUnsaving, setIsSavingOrUnsaving] = useState(false);

    useEffect(() => {
        if (encodedToken) {
            fetchIsPostSaved(id, encodedToken).then((data) => {
                setIsSaved(data.isSaved);
            });
        }
    }, [id, post, encodedToken]);

    function handlePostSaveOrUnsave() {
        if (!isSavingOrUnsaving) {
            setIsSavingOrUnsaving(true);
            const submitFn = isSaved ? submitUnsavePost : submitSavePost;
            const promise = submitFn(id, encodedToken)
                .then(() => {
                    setIsSaved(!isSaved);
                })
                .catch((e) => {
                    throw new Error(
                        `Couldn't ${isSaved ? 'unsave' : 'save'} post`
                    );
                })
                .finally(() => setIsSavingOrUnsaving(false));
            toast.promise(promise, {
                loading: `${isSaved ? 'unsaving' : 'saving'} post`,
                success: `post ${isSaved ? 'unsaved' : 'saved'} successfully`,
                error: (e) => e.message
            });
        }
    }
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
            ) : isLoading ? (
                <PostSkeleton></PostSkeleton>
            ) : (
                <>
                    <div className="container post-container flex-col">
                        <div className="post flex-col">
                            <div className="headings flex-col">
                                <h1 className="title-primary">{post.title}</h1>
                                <p> {post.summary}</p>
                            </div>

                            {encodedToken && (
                                <div>
                                    <button
                                        className={`secondary-button small rounded flex-row save-post-button ${isSavingOrUnsaving && 'pending'}`}
                                        disabled={isSavingOrUnsaving}
                                        onClick={handlePostSaveOrUnsave}
                                    >
                                        {isSaved ? (
                                            <CheckedBookmarkIcon
                                                width="1em"
                                                height="1em"
                                            ></CheckedBookmarkIcon>
                                        ) : (
                                            <UncheckedBookmarkIcon
                                                width="1em"
                                                height="1em"
                                            ></UncheckedBookmarkIcon>
                                        )}
                                        <span>
                                            {isSaved ? 'unsave' : 'save'}
                                        </span>
                                    </button>
                                </div>
                            )}
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
