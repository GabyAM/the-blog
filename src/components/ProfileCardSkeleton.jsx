import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function ProfileCardSkeleton() {
    return (
        <div className="container profile-container">
            <div className="profile-card flex-col grey-card">
                <div className="main-section flex-row">
                    <div className="image-container">
                        <Skeleton
                            borderRadius="var(--space-300)"
                            width="100%"
                            height="100%"
                        ></Skeleton>
                    </div>
                    <div className="profile-user-info flex-col">
                        <Skeleton width="35%" height="32px"></Skeleton>
                        <Skeleton width="55%" height="20px"></Skeleton>
                    </div>
                </div>
                <div className="horizontal-separator"></div>

                <div className="saved-posts-container">
                    <h2 className="title-primary">
                        <Skeleton width="38%"></Skeleton>
                    </h2>
                    <div className="saved-posts flex-col">
                        <div className="saved-post">
                            <div className="image-container">
                                <Skeleton
                                    borderRadius="var(--space-300)"
                                    width="100%"
                                    height="100%"
                                ></Skeleton>
                            </div>
                            <div className="text-section">
                                <h3>{<Skeleton height="1em"></Skeleton>}</h3>
                                <span>{<Skeleton></Skeleton>}</span>
                            </div>
                        </div>
                    </div>
                    <div className="saved-posts flex-col">
                        <div className="saved-post">
                            <div className="image-container">
                                <Skeleton
                                    borderRadius="var(--space-300)"
                                    width="100%"
                                    height="100%"
                                ></Skeleton>
                            </div>
                            <div className="text-section">
                                <h3>{<Skeleton height="1em"></Skeleton>}</h3>
                                <span>{<Skeleton></Skeleton>}</span>
                            </div>
                        </div>
                    </div>
                    <div className="saved-posts flex-col">
                        <div className="saved-post">
                            <div className="image-container">
                                <Skeleton
                                    borderRadius="var(--space-300)"
                                    width="100%"
                                    height="100%"
                                ></Skeleton>
                            </div>
                            <div className="text-section">
                                <h3>{<Skeleton height="1em"></Skeleton>}</h3>
                                <span>{<Skeleton></Skeleton>}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
