export function SendComment({ postId, onSubmit }) {
    async function commentSubmitHandler(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const text = formData.get('comment-text');

        const token = localStorage.getItem('jwt');
        if (!token) {
            throw new Error('');
        }
        const res = await fetch(
            `https://odin-blog-api-beta.vercel.app/post/${postId}/comments`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${token}`
                },
                body: JSON.stringify({ text })
            }
        );
        if (!res.ok) {
            throw new Error('Error sending comment');
        }
        onSubmit();
    }
    return (
        <div className="comment-form-container">
            <span>Add a comment</span>
            <form
                className="comment-form flex-row"
                onSubmit={commentSubmitHandler}
            >
                <textarea name="comment-text" rows={3}></textarea>
                <button></button>
            </form>
        </div>
    );
}
