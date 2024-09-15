import './style.css';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'; // Import the useSelector hook to access Redux state

function Header() {
    // Retrieve the books from Redux state
    const books = useSelector((state) => state.books.books);

    // Calculate the total number of books
    const totalBooks = books.reduce((total, book) => total + (book.count || 1), 0);

    return (
        <>
            <div className="container">
                <h1>Online Library Station</h1>
                <div className="nav">
                    <ul>
                        <Link to='/'><li>HOME</li></Link>
                        <Link to='/books/'><li>BROWSE BOOKS</li></Link>
                        <Link to='/addbooks'>
                            <li>ADD BOOKS <span>({totalBooks})</span></li> {/* Display total number of books */}
                        </Link>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Header;
