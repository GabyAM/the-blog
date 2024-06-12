import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './Header';
import { Comment } from './Comment';
import { useAuth } from '../hooks/useAuth';
import '../styles/commentdetail.css';
import {
    useInfiniteQuery,
    useQuery,
    useQueryClient
} from '@tanstack/react-query';

export function CommentDetail() {
    const { id } = useParams();

    const { token: currentUser, encodedToken } = useAuth();

    function fetchComment() {
        return fetch(`http://localhost:3000/comment/${id}`).then((res) => {
            if (!res.ok) {
                throw new Error('');
            }
            return res.json();
        });
    }
    const {
        data: comment,
        isLoading,
        isError
    } = useQuery({
        queryKey: [`comment_${id}`],
        queryFn: fetchComment
    });
    return (
        <>
            <Header></Header>
            {!isLoading && !isError && (
                <div className="container comment-detail-container flex-col">
                    <div className="small-post-card">
                        <div className="image-container">
                            <img
                                src={
                                    comment.post.image ===
                                    '/images/post_thumbnail_placeholder.png'
                                        ? '/post_thumbnail_placeholder.png'
                                        : `http://localhost:3000${comment.post.image}`
                                }
                            ></img>
                        </div>
                        <div className="text-section flex-col">
                            <h2 className="title-primary">
                                {comment.post.title}
                            </h2>
                            <p>{comment.post.summary}</p>
                        </div>
                    </div>
                    <div className="horizontal-separator"></div>
                    <div className="comments flex-col">
                        <Comment comment={comment}></Comment>
                    </div>
                </div>
            )}
        </>
    );
}
