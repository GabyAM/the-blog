import '../styles/authforminput.css';
import { ErrorIcon } from './Icons';

export function AuthFormInput({
    type = 'text',
    name,
    label,
    rules,
    register,
    getValues,
    error
}) {
    const specialRules = {};
    if (name === 'password-confirm') {
        specialRules.validate = {
            matchesPassword: (value) => {
                const { password } = getValues();
                return password === value || 'Passwords do not match';
            }
        };
    }
    return (
        <label className="flex-col">
            {label}
            <div className={`form-input-container ${error ? 'error' : ''}`}>
                <input
                    className="form-input"
                    type={type}
                    {...register(name, { ...rules, ...specialRules })}
                ></input>
            </div>
            {error && (
                <span className="form-error flex-row">
                    <ErrorIcon width={16} height={16}></ErrorIcon>
                    <span>{error}</span>
                </span>
            )}
        </label>
    );
}
