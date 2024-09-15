import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBook } from '../utils/bookSlice';

function AddBook() {
  const location = useLocation();
  const { book } = location.state || {}; 
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle increment and decrement of book count
  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  // Handle adding the book
  const handleAddBook = () => {
    if (book) {
      const bookWithCount = { ...book, count };
      dispatch(addBook(bookWithCount));
      navigate('/books'); // Redirect to BrowseBooks after adding
    }
  };

  if (!book) {
    return <h2>No book selected</h2>; // Show a message if there's no book passed via state
  }

  return (
    <div className="addbookcontent">
        <div className="add-book">
      <h2>Add Book</h2>
      {/* Display the book details */}
      <img src={book.image || book.volumeInfo?.imageLinks?.thumbnail} alt={book.title || book.volumeInfo?.title} />
      <h3>{book.title || book.volumeInfo?.title}</h3>
      <p><strong>Author:</strong> {book.author || book.volumeInfo?.authors?.[0]}</p>

      {/* Counter for book quantity */}
      <div className="counter">
        <button onClick={decrement}>-</button>
        <span>{count}</span>
        <button onClick={increment}>+</button>
      </div>

      {/* Add book button */}
      <div className="add-button">
      <button onClick={handleAddBook}>
        Add {count} {count > 1 ? 'Books' : 'Book'}
      </button>
      </div>
      </div>
    </div>
    
      
  );
}

export default AddBook;
