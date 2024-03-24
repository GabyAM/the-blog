import Skeleton from 'react-loading-skeleton';

export function ProfileCardSkeleton() {
    const highlightColor = 'var(--green-100)';
    const baseColor = 'var(--green-200)';
    return (
        <div className="profile-card flex-row">
            <>
                <div className="image-container">
                    <Skeleton
                        highlightColor={highlightColor}
                        baseColor={baseColor}
                        width="100%"
                        height="100%"
                    ></Skeleton>
                </div>
                <div className="profile-card-info flex-col">
                    <div className="text flex-col">
                        <span>
                            <Skeleton
                                highlightColor={highlightColor}
                                baseColor={baseColor}
                                height="36px"
                                width="80%"
                            ></Skeleton>
                        </span>
                        <span>
                            <Skeleton
                                highlightColor={highlightColor}
                                baseColor={baseColor}
                                height="20px"
                                width="60%"
                            ></Skeleton>
                        </span>
                    </div>
                </div>
            </>
        </div>
    );
}
