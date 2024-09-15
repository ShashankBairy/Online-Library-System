import './style.css';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function CategoryBooks() {
    const { category } = useParams(); // Get the category from the URL
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryBooks = async () => {
            setLoading(true);
            setError(null);
            try {
                const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${category.replace('-', '%20')}&maxResults=40`;
                console.log('Fetching data from:', url);
                const response = await fetch(url);
                const result = await response.json();
                console.log('API Response:', result);

                if (result.items) {
                    console.log('Books found:', result.items);
                    setBooks(result.items);
                } else {
                    console.log('No books found for this category.');
                    setBooks([]);
                }
            } catch (error) {
                console.error('Error fetching books:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryBooks();
    }, [category]);

    if (loading) {
        return <p>Loading books...</p>;
    }

    if (err) {
        return <p>Error loading books: {err.message}</p>;
    }

    return (
        <>
            <div className="books">
                <h2>{category.replace('-', ' ')} Books</h2>
                {books.length === 0 ? <p>No books found for this category</p> : null}
                <div className="books-grid">
                    {books.map(book => (
                        <div key={book.id} className="bookcard">
                            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                            <h4>{book.volumeInfo.title}</h4>
                            <p>{book.volumeInfo.authors?.[0]}</p>
                            <Link to={`/books/v1/volumes/${book.id}`} className="view-more-link">
                                View More
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <div className="browse-button">
                <Link to="/books">
                    <button>Browse Books</button>
                </Link>
            </div>
        </>
    );
}

export default CategoryBooks;
