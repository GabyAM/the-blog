import { useNavigate } from 'react-router-dom';

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
        <div className="login-background">
            <div className="login-form-container">
                <h1>Welcome</h1>
                <form onSubmit={(e) => authenticate(e)}>
                    <label>
                        Email
                        <input type="text" name="email" />
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" />
                    </label>
                    <button>Log in</button>
                </form>
            </div>
        </div>
    );
}
