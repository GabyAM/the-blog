import { useController } from 'react-hook-form';
import { ImageIcon } from './Icons';

export function ImageInput({ name, control }) {
    const { field, fieldState } = useController({
        name,
        control,
        rules: {
            required: 'Profile picture is required',
            validate: async (file) => {
                if (fieldState.isDirty) {
                    const maxSize = 5 * 1024 * 1024;
                    if (file.size > maxSize) return 'File exceeds limit';

                    const acceptedTypes = /image\/(jpeg|jpg|png|gif|webp)/;

                    if (!acceptedTypes.test(file.type)) {
                        return 'Invalid file type';
                    }
                }
                return true;
            }
        }
    });

    function handleInputChange(e) {
        if (e.target.files && e.target.files[0]) {
            field.onChange(e.target.files[0]);
        }
    }

    return (
        <div
            className={`image-input-container ${fieldState.isDirty ? 'uploaded' : ''}`}
        >
            <label htmlFor="image-file-input" className="custom-image-input">
                <div className="flex-col">
                    <ImageIcon width={96} height={96}></ImageIcon>
                </div>
            </label>
            <input
                name={name}
                id="image-file-input"
                type="file"
                onChange={handleInputChange}
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            ></input>
            <img
                src={
                    typeof field.value === 'string'
                        ? field.value
                        : URL.createObjectURL(field.value)
                }
            ></img>
        </div>
    );
}
