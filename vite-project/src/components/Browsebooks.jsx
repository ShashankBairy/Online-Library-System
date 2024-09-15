import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const categories = ['Fiction', 'Science Fiction', 'Fantasy', 'Horror', 'Romance'];

function BrowseBooks() {
  const [categoryData, setCategoryData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = {};
      for (const category of categories) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${category.replace(' ', '%20')}&maxResults=5`;
        const response = await fetch(url);
        const result = await response.json();
        data[category] = result;
      }
      setCategoryData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery.replace(' ', '%20')}&maxResults=40`;
    const response = await fetch(searchUrl);
    const result = await response.json();
    setSearchResults(result.items || []);
    setLoading(false);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className="searchcontent">
        <input
          type="text"
          placeholder="Search books by title or author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchResults.length > 0 ? (
        <div className="books">
          <h2>Search Results</h2>
          <div className="books-grid">
            {searchResults.map(book => (
              <div key={book.id} className="bookcard">
                <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                <h4>{book.volumeInfo.title}</h4>
                <p>{book.volumeInfo.authors?.[0]}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="books">
          <h2>Featured Books</h2>
          {categories.map(category => {
            const data = categoryData[category] || {};
            const books = data.items || [];
            return (
              <div key={category} className="category-section">
                <h3>{category} Books</h3>
                {books.length === 0 && <p>No books found in this category</p>}
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
                <Link to={`/books/${category.toLowerCase().replace(' ', '-')}`} className="view-more-link">
                  View More
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default BrowseBooks;
