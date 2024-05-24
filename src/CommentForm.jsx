import { Link } from 'react-router-dom';
import './styles/commentform.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorIcon } from './Icons';

export function CommentForm({ onSubmit, disabled, isOnComment, onClose }) {
    const [isPending, setIsPending] = useState(false);
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors }
    } = useForm();

    function handleFormSubmit(formData) {
        if (disabled || isPending) return;
        setIsPending(true);
        const promise = onSubmit(formData)
            .then(() => {
                if (isOnComment) {
                    onClose();
                }
                reset();
            })
            .catch((e) => {
                setError('text', { message: "Couldn't submit comment" });
            })
            .finally(() => setIsPending(false));
    }
    return (
        <>
            <form
                className={`comment-form flex-col ${disabled || isPending ? 'disabled' : ''}`}
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <div className="textarea-container">
                    <textarea
                        {...register('text', {
                            required: 'Comment cannot be empty'
                        })}
                        rows={3}
                    ></textarea>
                    {disabled && (
                        <h3 className="login-message">
                            <Link to="/login">Log in</Link> to send a comment
                        </h3>
                    )}
                    {errors && errors.text && (
                        <span className="form-error flex-row">
                            <ErrorIcon width="1em" height="1em"></ErrorIcon>
                            <span>{errors.text.message}</span>
                        </span>
                    )}
                </div>
                <div className="comment-form-actions flex-row">
                    {isOnComment && (
                        <button
                            className="cancel-button"
                            onClick={() => onClose()}
                        >
                            Cancel
                        </button>
                    )}
                    <button className="send-button">Send</button>
                </div>
            </form>
        </>
    );
}
