import '../styles/pageerror.css';

export function PageError({ error }) {
    return (
        <div className="error-container">
            {error.status < 500 ? (
                <img
                    src="/src/assets/404_error.svg"
                    alt="404. Oops!, The data you requested doesn't exist or has been deleted"
                ></img>
            ) : (
                <img
                    src="/src/assets/500_error.svg"
                    alt="500. Sorry!, There was an error fetching the data from the server. Try again later please."
                ></img>
            )}
        </div>
    );
}
