import { useEffect, useState } from 'react';
import { Comment } from './Comment';
import './styles/comments.css';
import { SendComment } from './SendComment';
import { CaretIcon } from './Icons';
import { useAuth } from './hooks/useAuth';
import { usePagination } from './hooks/usePagination';

export function Comments({ postId }) {
    const {
        results: comments,
        count,
        loading,
        error,
        fetchNextPage,
        loadingNextPage,
        nextPageError
    } = usePagination(`http://localhost:3000/post/${postId}/comments`);
    const [hidden, setHidden] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        function handleScroll() {
            if (
                !hidden &&
                window.innerHeight + window.scrollY + 1 >=
                    document.body.offsetHeight
            ) {
                if (!loadingNextPage) {
                    fetchNextPage();
                }
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetchNextPage, loadingNextPage, hidden]);

    return (
        <div className="comment-section flex-col">
            {token && (
                <SendComment
                    postId={postId}
                ></SendComment>
            )}
                        <button
                            className="toggle-comments"
                            onClick={() => setHidden(!hidden)}
                        >
                            <CaretIcon
                                width={32}
                                height={32}
                                orient={hidden ? 'down' : 'up'}
                            ></CaretIcon>
                            <span>
                                {hidden
                                    ? `Show comments (${count})`
                                    : 'Hide comments'}
                            </span>
                        </button>
                        {!hidden &&
                            (loading ? (
                                <span>Loading comments...</span>
                            ) : error ? (
                                <span>{error}</span>
                            ) : (
                                <div className="comments flex-col">
                                    {comments.map((comment) => {
                                        return (
                                            <>
                                                <Comment
                                                    key={comment._id}
                                                    comment={comment}
                                                ></Comment>
                                                <div className="horizontal-separator"></div>
                                            </>
                                        );
                                    })}
                                </div>
                            ))}
                    </div>
                </>
            ) : (
                <span>{"There's no comments yet"}</span>
            )}
        </div>
    );
}
