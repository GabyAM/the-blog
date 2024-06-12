import toast from 'react-hot-toast';
import '../styles/savedposts.css';
import { SavedPost } from './SavedPost';
import { submitUnsavePost } from '../api/post';
import { useAuth } from '../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';

export function SavedPosts({ posts, setPosts }) {
    const { encodedToken } = useAuth();
    function updatePost(postIndex, update) {
        setPosts((prevPosts) => {
            const newPosts = [...prevPosts];
            newPosts[postIndex] = { ...newPosts[postIndex], ...update };
            return newPosts;
        });
    }

    const mutation = useMutation({
        mutationKey: ['unsave_post'],
        mutationFn: ({ id, index }) => submitUnsavePost(id, encodedToken),
        onSuccess: (data, variables) => {
            const { postIndex } = variables;
            setPosts((prevPosts) => {
                const newPosts = [...prevPosts];
                newPosts.splice(postIndex, 1);
                return newPosts;
            });
        },
        onError: (error, variables) => {
            const { postIndex } = variables;
            updatePost(postIndex, { isPending: false });
        }
    });
    function unsavePost(id) {
        const postIndex = posts.findIndex((post) => post._id === id);
        updatePost(postIndex, { isPending: true });
        toast.promise(mutation.mutateAsync({ id, postIndex }), {
            loading: 'Unsaving post...',
            success: 'Post unsaved',
            error: () => "Couldn't unsave post"
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
