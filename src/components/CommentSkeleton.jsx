import Skeleton from 'react-loading-skeleton';

export function CommentSkeleton() {
    return (
        <div className={'comment-container flex-col'}>
            <div className="comment">
                <div className="image-container">
                    <Skeleton
                        width="100%"
                        height="100%"
                        borderRadius="var(--space-300)"
                    />
                </div>
                <div className="text">
                    <Skeleton width="20%"></Skeleton>
                    <Skeleton count={3}></Skeleton>
                </div>
            </div>
        </div>
    );
}
