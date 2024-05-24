import { useContext, useEffect, useRef, useState } from 'react';
import './styles/comment.css';
import { Link } from 'react-router-dom';
import { CommentForm } from './CommentForm';
import { useCommentTree } from './hooks/useCommentTree';
import { useAuth } from './hooks/useAuth';
import { RepliesIcon, ReplyIcon } from './Icons';

export function Comment({ comment }) {
    const { encodedToken: token } = useAuth();
    const text = useRef(null);
    const [isOverflown, setIsOverflown] = useState(false);
    const [textHidden, setTextHidden] = useState(true);
    const [isReplying, setIsReplying] = useState(false);
    const submitReply = useCommentTree();

    useEffect(() => {
        if (text.current) {
            const textHeight = text.current.getBoundingClientRect().height;
            setIsOverflown(textHeight > 160);
        }
    }, []);

    const isDeleted = comment.user === null;
    const hasMoreReplies =
        comment.comments.length > 0 && typeof comment.comments[0] === 'string';
    return (
        <div
            className={
                'comment-container flex-col' +
                (comment.comments.length ? ' parent-comment' : '')
            }
        >
            <div
                className={
                    'comment' +
                    (!textHidden ? ' expanded' : '') +
                    (isDeleted ? ' deleted' : '')
                }
            >
                {isDeleted ? (
                    <span>This comment was removed</span>
                ) : (
                    <>
                        <div className="image-container">
                            <img
                                src={
                                    comment.user.image === '/images/profile.png'
                                        ? '/profile.png'
                                        : `http://localhost:3000${comment.user.image}`
                                }
                            ></img>
                        </div>
                        <div ref={text} className="text">
                            <Link to={`/user/${comment.user._id}`}>
                                <span>{comment.user.name}</span>
                            </Link>
                            <p
                                className={
                                    isOverflown && textHidden ? 'overflown' : ''
                                }
                            >
                                {comment.text}
                            </p>
                            {isOverflown && (
                                <button
                                    className="toggle-comment-length"
                                    onClick={() => setTextHidden(!textHidden)}
                                >
                                    {textHidden ? 'Show more' : 'Show less '}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
            {(isReplying || token || hasMoreReplies) && (
                <div className="replies-section">
                    {isReplying ? (
                        <CommentForm
                            isOnComment={true}
                            onClose={() => setIsReplying(false)}
                            onSubmit={(formData) =>
                                submitReply(formData, comment._id)
                            }
                        ></CommentForm>
                    ) : (
                        <div className="replies-actions flex-row">
                            {token && (
                                <button
                                    className="action-button reply-button flex-row"
                                    onClick={() => setIsReplying(!isReplying)}
                                >
                                    <ReplyIcon
                                        width="1.2em"
                                        height="1.2em"
                                    ></ReplyIcon>
                                    <span>Reply</span>
                                </button>
                            )}
                            {hasMoreReplies && (
                                <Link
                                    className="action-button goto-replies-button flex-row"
                                    to={`/comment/${comment._id}`}
                                >
                                    <RepliesIcon
                                        width="1.2em"
                                        height="1.2em"
                                    ></RepliesIcon>
                                    <span>See replies</span>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            )}
            {comment.comments.map((reply) => {
                if (typeof reply === 'object')
                    return <Comment key={reply._id} comment={reply}></Comment>;
            })}
        </div>
    );
}
