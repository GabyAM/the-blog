import { useState } from 'react';
import { ImageInput } from './ImageInput';
import { useForm } from 'react-hook-form';
import { CaretIcon, ErrorIcon } from './Icons';

export function ProfileForm({ user, onSubmit }) {
    const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);

    function handleFormSubmit(formData) {
        const newFormData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (formData[key] !== formState.defaultValues[key]) {
                newFormData.append(key, value);
            }
        });
        if (Array.from(newFormData.keys()).length > 0) {
            onSubmit(newFormData);
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        formState,
        control,
        getValues
    } = useForm({
        defaultValues: {
            image: `http://localhost:3000${user.image}`,
            name: user.name,
            email: user.email,
            oldPassword: '',
            newPassword: ''
        }
    });
    return (
        <form
            className="profile-edit-form flex-col"
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
        >
            <section>
                <label htmlFor="image" className="title-primary small">
                    Profile picture
                </label>
                <ImageInput control={control} name="image"></ImageInput>
                {errors.image && (
                    <span className="form-error flex-row">
                        <ErrorIcon width={16} height={16}></ErrorIcon>
                        <span>{errors.image.message}</span>
                    </span>
                )}
            </section>
            <div className="horizontal-separator"></div>
            <section>
                <label htmlFor="name" className="title-primary small">
                    Name
                </label>
                <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="text-input main-text-input"
                ></input>
                {errors.name && (
                    <span className="form-error flex-row">
                        <ErrorIcon width={16} height={16}></ErrorIcon>
                        <span>{errors.name.message}</span>
                    </span>
                )}
            </section>
            <div className="horizontal-separator"></div>
            <section>
                <label htmlFor="email" className="title-primary small">
                    Email
                </label>
                <input
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Email must be in the correct format'
                        }
                    })}
                    type="text"
                    className="text-input main-text-input"
                ></input>
                {errors.email && (
                    <span className="form-error flex-row">
                        <ErrorIcon width={16} height={16}></ErrorIcon>
                        <span>{errors.email.message}</span>
                    </span>
                )}
            </section>
            <div className="horizontal-separator"></div>
            <div className="password-subform">
                <h2 className="title-primary small">Password</h2>
                <button
                    className="toggle-form-button"
                    type="button"
                    onClick={() => setIsPasswordFormOpen(!isPasswordFormOpen)}
                >
                    <CaretIcon
                        orient={isPasswordFormOpen ? 'up' : 'down'}
                    ></CaretIcon>
                    <span>Change password</span>
                </button>
                {isPasswordFormOpen && (
                    <div className="flex-row passwords-container">
                        <section>
                            <label
                                htmlFor="oldPassword"
                                className="title-primary small"
                            >
                                Old password
                            </label>
                            <input
                                {...register('oldPassword', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message:
                                            'Password must have at least 8 characters'
                                    }
                                })}
                                type="password"
                                className="text-input secondary-text-input"
                            ></input>
                            <div className="horizontal-separator"></div>
                            {errors.oldPassword && (
                                <span className="form-error flex-row">
                                    <ErrorIcon
                                        width="1em"
                                        height="1em"
                                    ></ErrorIcon>
                                    <span>{errors.oldPassword.message}</span>
                                </span>
                            )}
                        </section>
                        <section>
                            <label
                                htmlFor="newPassword"
                                className="title-primary small"
                            >
                                New password
                            </label>
                            <input
                                {...register('newPassword', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message:
                                            'Password must have at least 8 characters'
                                    },
                                    validate: {
                                        differentPassword: (value) => {
                                            const { oldPassword } = getValues();
                                            return (
                                                value !== oldPassword ||
                                                'Enter a different password'
                                            );
                                        }
                                    }
                                })}
                                type="password"
                                className="text-input secondary-text-input"
                            ></input>
                            <div className="horizontal-separator"></div>
                            {errors.newPassword && (
                                <span className="form-error flex-row">
                                    <ErrorIcon
                                        width="1em"
                                        height="1em"
                                    ></ErrorIcon>
                                    <span>{errors.newPassword.message}</span>
                                </span>
                            )}
                        </section>
                    </div>
                )}
            </div>
            <button className="profile-form-save-button">Save</button>
        </form>
    );
}
