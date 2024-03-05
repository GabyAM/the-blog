import { useNavigate } from 'react-router-dom';
import './styles/login.css';

export function Login() {
    const navigate = useNavigate();
    async function authenticate(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const response = await fetch(
            'https://odin-blog-api-beta.vercel.app/user/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );
        if (!response.ok) {
            throw new Error('validation failed');
        }
        const result = await response.json();
        localStorage.setItem('jwt', result.token);
        navigate('/posts');
    }

    return (
        <>
            <div className="login-layout">
                <div className="login-form-section">
                    <form
                        className="login-form flex-col"
                        onSubmit={handleSubmit(authenticate)}
                    >
                        <h1 className="title-primary">Welcome</h1>
                        <div className="fields-container flex-col">
                            <label className="flex-col">
                                Email
                                <div className="form-input-container">
                                    <input
                                        className="form-input"
                                        type="text"
                                    />
                                </div>
                            </label>
                            <label className="flex-col">
                                Password
                                <div className="form-input-container">
                                    <input
                                        className="form-input"
                                        type="password"
                                    />
                                </div>
                                {errors.password && (
                                    <span className="form-error">
                                        {errors.password.message}
                                    </span>
                                )}
                            </label>
                        </div>
                        <button>Log in</button>
                    </form>
                </div>
                <div className="login-background">
                    <h1 className="title-primary">Read about everything.</h1>
                </div>
            </div>
        </>
    );
}
