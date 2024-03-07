import { Outlet } from 'react-router-dom';
import './styles/login.css';

export function UserForm() {
    return (
        <>
            <div className="user-form-layout">
                <div className="user-form-section">
                    <div className="user-form-container flex-col">
                        <h1 className="title-primary">Welcome</h1>
                        <Outlet></Outlet>
                    </div>
                </div>
                <div className="user-form-background">
                    <h1 className="title-primary">Read about everything.</h1>
                </div>
            </div>
        </>
    );
}
