import { useParams } from 'react-router-dom';
import { Header } from './Header';
import { Comment } from './Comment';
import '../styles/commentdetail.css';
import { useQuery } from '@tanstack/react-query';
import { CommentSkeleton } from './CommentSkeleton';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { PageError } from './PageError';
import { fetchComment } from '../api/comment';

export function CommentDetail() {
    const { id } = useParams();

    const {
        data: comment,
        isLoading,
        error
    } = useQuery({
        queryKey: ['comment', id],
        queryFn: () => fetchComment(id)
    });
    return (
        <>
            <Header></Header>
            {error ? (
                <PageError error={error}></PageError>
            ) : (
                <div className="container comment-detail-container flex-col">
                    <div className="small-post-card">
                        <div className="image-container">
                            {comment?.post?.image ? (
                                <img
                                    src={
                                        comment.post.image ===
                                        '/images/post_thumbnail_placeholder.png'
                                            ? '/post_thumbnail_placeholder.png'
                                            : `http://localhost:3000${comment.post.image}`
                                    }
                                ></img>
                            ) : (
                                <Skeleton
                                    width="100%"
                                    height="100%"
                                    borderRadius="var(--space-200)"
                                ></Skeleton>
                            )}
                        </div>
                        <div className="text-section flex-col">
                            <h2 className="title-primary">
                                {comment?.post?.title || (
                                    <Skeleton width="60%"></Skeleton>
                                )}
                            </h2>
                            <p>
                                {comment?.post?.summary || (
                                    <Skeleton count={2} width="90%"></Skeleton>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="horizontal-separator"></div>

                    <div className="comments flex-col">
                        {isLoading ? (
                            <CommentSkeleton></CommentSkeleton>
                        ) : (
                            <Comment comment={comment}></Comment>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
