import { useParams } from 'react-router-dom';
import { Header } from './Header';
import { useFetchData } from './hooks/useFetchData';
import './styles/profile.css';
import { useEffect } from 'react';
import { EditIcon } from './Icons';
import { ProfileCardSkeleton } from './ProfileCardSkeleton';
import { useAuth } from './hooks/useAuth';

export function Profile() {
    const { id } = useParams();
    const {
        data: user,
        loading,
        error,
        fetchData: fetchUser
    } = useFetchData(`http://localhost:3000/user/${id}`);

    const { token: currentUser } = useAuth();

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <>
            <Header></Header>
            <div className="container profile-container">
                <div className="flex-col grey-card">
                        <div className="profile-card flex-row">
                            <>
                                <div className="image-container">
                                    <img
                                        src={`http://localhost:3000${user.image}`}
                                    ></img>
                                </div>
                                <div className="profile-card-info flex-col">
                                    <div className="text flex-col">
                                        <span>{user.name}</span>
                                        <span>{user.email}</span>
                                    </div>
                                    {currentUser.id === user._id && (
                                        <button className="flex-row profile-edit-button">
                                            <EditIcon></EditIcon>
                                            <span>Edit</span>
                                        </button>
                                    )}
                                </div>
                            </>
                        </div>
                </div>
            </div>
        </>
    );
}
