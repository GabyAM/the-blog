import { Link, useParams } from 'react-router-dom';
import { Header } from './Header';
import '../styles/post.css';
import { Comments } from './Comments';
import { useCallback, useEffect, useState } from 'react';
import { PostSkeleton } from './PostSkeleton';
import { useAuth } from '../hooks/useAuth';
import { CheckedBookmarkIcon, UncheckedBookmarkIcon } from './Icons';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import {
    fetchIsPostSaved,
    fetchPost,
    submitSavePost,
    submitUnsavePost
} from '../api/post';
import { PageError } from './PageError';
import he from 'he';
import postThumbnailPlaceholder from '../assets/post_thumbnail_placeholder.png';
import { IMAGES_URL } from '../constants';

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
        queryFn: fetchFn,
        select: (post) => ({
            ...post,
            title: he.unescape(post.title),
            summary: he.unescape(post.summary),
            author: {
                ...post.author,
                name: he.unescape(post.author.name)
            }
        })
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
            {isLoading ? (
                <PostSkeleton></PostSkeleton>
            ) : error ? (
                <PageError error={error}></PageError>
            ) : (
                post && (
                    <>
                        <div className="container post-container flex-col">
                            <div className="post flex-col">
                                <div className="headings flex-col">
                                    <h1 className="title-primary">
                                        {post.title}
                                    </h1>
                                    <p> {post.summary}</p>
                                    <span>
                                        By{' '}
                                        <Link to={`/user/${post.author._id}`}>
                                            {post.author.name}
                                        </Link>
                                    </span>
                                </div>

                                <div className="mid-section flex-col">
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
                                                    {isSaved
                                                        ? 'unsave'
                                                        : 'save'}
                                                </span>
                                            </button>
                                        </div>
                                    )}
                                    <div className="image-container">
                                        <img
                                            src={
                                                post.image ===
                                                'post_thumbnail_placeholder.png'
                                                    ? postThumbnailPlaceholder
                                                    : IMAGES_URL + post.image
                                            }
                                        ></img>
                                    </div>
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
                )
            )}
        </>
    );
}
