import '../styles/pageerror.css';
import error404 from '../assets/404_error.svg';
import error500 from '../assets/500_error.svg';

export function PageError({ error }) {
    return (
        <div className="error-container">
            {error.status < 500 ? (
                <img
                    src={error404}
                    alt="404. Oops!, The data you requested doesn't exist or has been deleted"
                ></img>
            ) : (
                <img
                    src={error500}
                    alt="500. Sorry!, There was an error fetching the data from the server. Try again later please."
                ></img>
            )}
        </div>
    );
}
