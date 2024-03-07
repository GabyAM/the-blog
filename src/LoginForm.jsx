import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorIcon } from './Icons';

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();
    async function onSubmit(formData) {
        const response = await fetch(
            'https://odin-blog-api-beta.vercel.app/user/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
        );
        const jsonResponse = await response.json();
        if (!response.ok) {
            if (!jsonResponse.errors) {
                throw new Error('Something went wrong while fetching data');
            }
        } else {
            localStorage.setItem('jwt', jsonResponse.token);
            navigate('/posts');
        }
    }

    return (
        <>
            <form
                className="user-form flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="fields-container flex-col">
                    <label className="flex-col">
                        Email
                        <div
                            className={`form-input-container ${
                                errors.email ? 'error' : ''
                            }`}
                        >
                            <input
                                className="form-input"
                                type="text"
                                name="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message:
                                            'Email must be in the correct format'
                                    }
                                })}
                            />
                        </div>
                        {errors.email && (
                            <span className="form-error flex-row">
                                <ErrorIcon width={16} height={16}></ErrorIcon>
                                <span>{errors.email}</span>
                            </span>
                        )}
                    </label>
                    <label className="flex-col">
                        Password
                        <div
                            className={`form-input-container ${
                                errors.password ? 'error' : ''
                            }`}
                        >
                            <input
                                className="form-input"
                                type="password"
                                name="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message:
                                            'Password must have at least 8 characters'
                                    }
                                })}
                            />
                        </div>
                        {errors.password && (
                            <span className="form-error flex-row">
                                <ErrorIcon width={16} height={16}></ErrorIcon>
                                <span>{errors.password}</span>
                            </span>
                        )}
                    </label>
                </div>
                <button>Log in</button>
            </form>
        </>
    );
}

