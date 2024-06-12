import { useParams } from 'react-router-dom';
import { Header } from './Header';
import './styles/profile.css';
import { useEffect, useState } from 'react';
import { EditIcon } from './Icons';
import { ProfileCardSkeleton } from './ProfileCardSkeleton';
import { useAuth } from './hooks/useAuth';
import { ProfileForm } from './ProfileForm';
import toast from 'react-hot-toast';
import { SavedPosts } from './SavedPosts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUser, submitUserEdit } from './api/user';

export function Profile() {
    const { id } = useParams();
    const { token: currentUser, encodedToken, loading } = useAuth();

    const {
        data: user,
        isLoading,
        error
    } = useQuery({
        queryKey: [`user_${id}`],
        queryFn: () => fetchUser(id, encodedToken),
        enabled: !loading
    });

    const [savedPosts, setSavedPosts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user && user.saved_posts) {
            setSavedPosts(user.saved_posts);
        }
    }, [user]);

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: [`user_${id}_edit`],
        mutationFn: (formData) => submitUserEdit(formData, id, encodedToken),
        onSuccess: (data) => {
            const user = data.user;
            queryClient.setQueryData([`user_${id}`], () => user);
        },
        onError: () => new Error("Couldn't update user"),
        onSettled: () => setIsEditing(false)
    });
    function handleEditUser(formData) {
        toast.promise(mutation.mutateAsync(formData), {
            loading: 'Updating user...',
            success: 'User updated successfully',
            error: (e) => e.message
        });
    }

    const isOwnProfile = currentUser ? currentUser.id === id : false;

    return (
        <>
            <Header></Header>
            {!isLoading && user && (
                <div className="container profile-container">
                    <div className="profile-card flex-col grey-card">
                        {isEditing ? (
                            <ProfileForm
                                onSubmit={handleEditUser}
                                user={user}
                            ></ProfileForm>
                        ) : (
                            <>
                                <div className="main-section flex-row">
                                    <div className="image-container">
                                        <img
                                            src={`http://localhost:3000${user.image}`}
                                        ></img>
                                    </div>
                                    <div className="profile-user-info flex-col">
                                        <span className="user-name">
                                            {user.name}
                                        </span>
                                        <span className="user-email">
                                            {user.email}
                                        </span>
                                        {isOwnProfile && (
                                            <button
                                                onClick={() =>
                                                    setIsEditing(true)
                                                }
                                                className="secondary-button rounded medium profile-edit-button flex-row"
                                            >
                                                <EditIcon></EditIcon>
                                                <span>Edit</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {isOwnProfile && savedPosts.length > 0 && (
                                    <>
                                        <div className="horizontal-separator"></div>
                                        <SavedPosts
                                            posts={savedPosts}
                                            setPosts={setSavedPosts}
                                        ></SavedPosts>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
