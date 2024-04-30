import { useContext, useEffect, useRef, useState } from 'react';
import './styles/comment.css';

export function Comment({ comment }) {
    const text = useRef(null);
    const [isOverflown, setIsOverflown] = useState(false);
    const [textHidden, setTextHidden] = useState(true);

    useEffect(() => {
        if (text.current) {
            const textHeight = text.current.getBoundingClientRect().height;
            setIsOverflown(textHeight > 160);
        }
    }, []);

    const isDeleted = comment.user === null;
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
                            <span>{comment.user.name}</span>
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
            {comment.comments.map((reply) => (
                <Comment key={reply._id} comment={reply}></Comment>
            ))}
        </div>
    );
}
