import { Link } from 'react-router-dom';
import { SendIcon } from './Icons';
import './styles/sendcomment.css';

export function SendComment({ postId, onSubmit, disabled, pending }) {
    return (
        <div
            className={`comment-form-container ${disabled || pending ? 'disabled' : ''}`}
        >
            <span>Add a comment</span>
            <form
                className="comment-form flex-row"
                onSubmit={(e) => {
                    if (disabled || pending) return;
                    onSubmit(e);
                    e.target.reset();
                }}
            >
                <textarea name="comment-text" rows={3}></textarea>
                <button className="flex-row">
                    <SendIcon width={32} height={32}></SendIcon>
                </button>
            </form>
            {disabled && (
                <h3>
                    <Link to="/login">Log in</Link> to send a message
                </h3>
            )}
        </div>
    );
}
