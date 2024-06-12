import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { submitLogin } from '../api/auth';
import { AuthFormInput } from './AuthFormInput';
import { AuthForm } from './AuthForm';

export function LoginForm() {
    const { updateToken } = useAuth();
    const navigate = useNavigate();

    return (
        <AuthForm
            onSubmit={submitLogin}
            onSuccess={(res) => {
                updateToken(res.accessToken);
                navigate('/posts');
            }}
        >
            <AuthFormInput
                type="text"
                name="email"
                label="Email"
                rules={{
                    required: 'Email is required',
                    pattern: {
                        value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Email must be in the correct format'
                    }
                }}
            ></AuthFormInput>
            <AuthFormInput
                type="password"
                name="password"
                label="Password"
                rules={{
                    required: 'Password is required',
                    minLength: {
                        value: 8,
                        message: 'Password must have at least 8 characters'
                    }
                }}
            ></AuthFormInput>
        </AuthForm>
    );
}
