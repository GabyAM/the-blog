import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function RecentPostSkeleton() {
    return (
        <div className="recent-post">
            <div className="image-container">
                <Skeleton width={'100%'} height={'100%'}></Skeleton>
            </div>
            <div className="post-text flex-col">
                <h3 className="title-primary">
                    <Skeleton count={2}></Skeleton>
                </h3>
                <p>
                    <Skeleton count={3}></Skeleton>
                </p>
            </div>
        </div>
    );
}
