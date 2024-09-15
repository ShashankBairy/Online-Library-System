import './style.css';
import { Link } from 'react-router-dom';
import useFetch from '../utils/useFetch';

const categories = ['Fiction', 'Science Fiction', 'Fantasy', 'Horror', 'Romance'];

function Homepage() {
    const { data: popularBooks, loading, err } = useFetch('https://www.googleapis.com/books/v1/volumes?q=subject:popular&maxResults=5');

    return (
        <div className="bookdetail-container">
            <div className="welcomecontent">
                <h2>Welcome to the Online Library Station!</h2>
                <p>Browse through our categories, and discover new books in your favorite genres.</p>
            </div>

            <aside className="category-sidebar">
                <h3>Categories</h3>
                <ul>
                    {categories.map(category => (
                        <li key={category}>
                            <Link to={`/books/${category.toLowerCase().replace(' ', '-')}`}>
                                {category}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

            <div className="bookdetail-content">
                <h2>Popular Books</h2>
                {loading && <p>Loading popular books...</p>}
                {err && <p>Error loading popular books: {err.message}</p>}
                {!loading && !err && popularBooks?.items?.length === 0 && <p>No popular books found</p>}
                {!loading && !err && popularBooks?.items?.length > 0 && (
                    <div className="books-grid">
                        {popularBooks.items.map(book => (
                            <div key={book.id} className="bookcard">
                                <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                                <h4>{book.volumeInfo.title}</h4>
                                <p>{book.volumeInfo.authors?.[0]}</p>
                                <Link to={`/books/v1/${book.id}`} className="view-more-link">
                                    View More
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Homepage;
