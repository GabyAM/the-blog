import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function PostCardSkeleton() {
    return (
        <div className="post-card">
            <div className="post-card-text flex-col">
                <h2 className="title-primary">
                    <Skeleton></Skeleton>
                </h2>
                <Skeleton width="30%"></Skeleton>
                <Skeleton count={6}></Skeleton>
                <Skeleton className="comment-count" width="30%"></Skeleton>
            </div>
            <div className="image-container">
                <Skeleton width="100%" height="100%"></Skeleton>
            </div>
        </div>
    );
}
