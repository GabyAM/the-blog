import toast from 'react-hot-toast';
import { SavedPost } from './SavedPost';

export function SavedPosts({ posts, setPosts, token }) {
    function updatePost(postIndex, update) {
        setPosts((prevPosts) => {
            const newPosts = [...prevPosts];
            newPosts[postIndex] = { ...newPosts[postIndex], ...update };
            return newPosts;
        });
    }
    function unsavePost(id) {
        const postIndex = posts.findIndex((post) => post._id === id);
        updatePost(postIndex, { isPending: true });

        const promise = fetch(`http://localhost:3000/post/${id}/unsave`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Authorization: `bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                setPosts((prevPosts) => {
                    const newPosts = [...prevPosts];
                    newPosts.splice(postIndex, 1);
                    return newPosts;
                });
            })
            .catch((e) => {
                updatePost(postIndex, { isPending: false });
                throw new Error("Couldn't unsave post");
            });

        toast.promise(promise, {
            loading: 'Unsaving post...',
            success: 'Post unsaved',
            error: (e) => e.message
        });
    }
    return (
        <div className="saved-posts-container">
            <h2 className="title-primary">Saved posts</h2>
            <div className="saved-posts flex-col">
                {posts.map((post) => (
                    <SavedPost
                        key={post._id}
                        post={post}
                        onUnsave={(id) => unsavePost(id)}
                    ></SavedPost>
                ))}
            </div>
        </div>
    );
}
