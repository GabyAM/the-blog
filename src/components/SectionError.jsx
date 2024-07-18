import '../styles/sectionerror.css';
import { ErrorIcon } from './Icons';

export function SectionError({ size = 'large' }) {
    const iconSize = size === 'large' ? '6em' : '4em';
    return (
        <div className={'error-card ' + size}>
            <div className="flex-row">
                <ErrorIcon width={iconSize} height={iconSize}></ErrorIcon>
                <p>
                    There was an error loading this data, try again later please
                </p>
            </div>
        </div>
    );
}
