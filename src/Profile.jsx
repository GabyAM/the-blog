import { useParams } from 'react-router-dom';
import { Header } from './Header';
import { useFetchData } from './hooks/useFetchData';
import './styles/profile.css';
import { useEffect, useState } from 'react';
import { EditIcon } from './Icons';
import { ProfileCardSkeleton } from './ProfileCardSkeleton';
import { useAuth } from './hooks/useAuth';
import { ProfileForm } from './ProfileForm';
import toast from 'react-hot-toast';

export function Profile() {
    const { id } = useParams();
    const {
        data: user,
        setData: setUser,
        loading,
        error,
        fetchData: fetchUser
    } = useFetchData(`http://localhost:3000/user/${id}`);

    const { token: currentUser, encodedToken } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    function handleEditUser(formData) {
        const promise = fetch(`http://localhost:3000/user/${id}/update`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Authorization: `bearer ${encodedToken}`
            },
            body: formData
        })
            .then(async (res) => {
                const data = await res.json();
                const user = data.user;
                setUser(user);
            })
            .catch((e) => {
                return new Error("Couldn't update user");
            })
            .finally(setIsEditing(false));

        toast.promise(promise, {
            loading: 'Updating user...',
            success: 'User updated successfully',
            error: (e) => e.message
        });
    }

    return (
        <>
            <Header></Header>
            {!loading && (
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
                                        {currentUser.id === user._id && (
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
                                <div className="horizontal-separator"></div>
                                <div>
                                    <h2 className="title-primary">
                                        Saved posts
                                    </h2>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
