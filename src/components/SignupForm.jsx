import { useNavigate } from 'react-router-dom';

import { AuthForm } from './AuthForm';
import { AuthFormInput } from './AuthFormInput';
import { submitSignup } from '../api/auth';
import { useAuth } from '../hooks/useAuth';

export function SignupForm() {
    const { encodedToken: token } = useAuth();
    const navigate = useNavigate();
    return (
        <AuthForm
            onSubmit={(formData) => submitSignup(formData, token)}
            onSuccess={() => navigate('/posts')}
            buttonText="Sign up"
        >
            <AuthFormInput
                type="text"
                name="name"
                label="Name"
                rules={{
                    required: 'name is required'
                }}
            ></AuthFormInput>
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
            <AuthFormInput
                type="password"
                name="password-confirm"
                label="Password"
                rules={{
                    required: 'Password confirm is required'
                }}
            ></AuthFormInput>
        </AuthForm>
    );
}
