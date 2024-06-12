import '../styles/authform.css';
import { useForm } from 'react-hook-form';
import { ErrorIcon } from './Icons';
import React from 'react';

export function AuthForm({ onSubmit, onSuccess, buttonText, children }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError
    } = useForm();

    async function onFormSubmit(formData) {
        return onSubmit(formData)
            .then((res) => {
                if (res.errors) {
                    const errors = res.errors;
                    Object.keys(errors).map((key) => {
                        setError(key, { type: 'server', message: errors[key] });
                    });
                } else {
                    onSuccess(res);
                }
            })
            .catch((e) => {
                setError('root.serverError', {
                    type: 'server',
                    message: 'too bad!'
                });
            });
    }

    return (
        <form
            className="user-form flex-col"
            onSubmit={handleSubmit(onFormSubmit)}
        >
            <div className="fields-container flex-col">
                {React.Children.map(children, (child) => {
                    return React.createElement(child.type, {
                        ...{
                            ...child.props,
                            register,
                            getValues,
                            ...(errors &&
                                errors[child.props.name] && {
                                    error: errors[child.props.name].message
                                }),
                            key: child.props.name
                        }
                    });
                })}
            </div>
            <button>{buttonText}</button>
            {errors && errors.root && errors.root.serverError && (
                <span className="form-error flex-row">
                    <ErrorIcon width={16} height={16}></ErrorIcon>
                    <span>{errors.root.serverError.message}</span>
                </span>
            )}
        </form>
    );
}
