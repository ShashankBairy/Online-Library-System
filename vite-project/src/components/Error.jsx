import { useRouteError, Link } from "react-router-dom";
import './style.css';

function Error() {
    const error = useRouteError();

    const errorMessage = error.statusText || "An unexpected error occurred";
    const errorDetails = error.data || "No additional details available";

    return (
        <div className="error-page">
            <h1>Error Page</h1>
            <h2>Something went wrong!</h2>
            <p><strong>Status:</strong> {error.status}</p>
            <p><strong>Message:</strong> {errorMessage}</p>
            <p><strong>Details:</strong> {errorDetails}</p>
            <div className="browse-button">
                <Link to='/'>
                    <button>Back to Home</button>
                </Link>
            </div>
        </div>
    );
}

export default Error;
