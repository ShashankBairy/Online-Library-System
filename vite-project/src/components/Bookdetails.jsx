import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../utils/useFetch";

function BookDetail() {
    const { bookId } = useParams();
    const { data, loading, err } = useFetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
    const [book, setBook] = useState(null);

    useEffect(() => {
        if (data) {
            setBook(data);
        }
    }, [data]);

    if (loading) {
        return <p>Loading book details...</p>;
    }

    if (err) {
        return <p>Error: {err}</p>;
    }

    return (
        <div>
            {book ? (
                <>
                    <div className="bookdetails">
                        <div className="bookimg">
                        {book.volumeInfo?.imageLinks?.thumbnail && (
                            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                        )}
                        </div>
                        <h2>{book.volumeInfo?.title}</h2>
                        <p><strong>Author(s):</strong> {book.volumeInfo?.authors?.join(', ') || "Unknown author"}</p>
                        <p><strong>Published Date:</strong> {book.volumeInfo?.publishedDate}</p>
                        <p><strong>Description:</strong></p>
                        {book.volumeInfo?.description ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: book.volumeInfo.description,
                                }}
                            />
                        ) : (
                            <p>No description available</p>
                        )}
                    </div>
                    <div className="booksbutton">
                        <div className="browse-button">
                            <Link to='/addbooks' state={{book}}>
                                <button>Add Book</button>
                            </Link>
                        </div>
                        <div className="browse-button">
                            <Link to="/books">
                                <button>Back to Browse Books</button>
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                <p>No book details found.</p>
            )}
        </div>
    );
}

export default BookDetail;
