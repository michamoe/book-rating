import { useEffect, useState } from 'react';
import CreateBook from './CreateBook';
import axios from 'axios';

function Books() {
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    axios
      .get('https://example-xtvq.onrender.com/posts')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    await axios.delete(`https://example-xtvq.onrender.com/posts/${bookId}`);
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    alert('Book is successfully deleted');
  };

  return (
    <div>
      <CreateBook setBooks={setBooks} />
      {books.map((book) => (
        <div key={book.id}>
          <h2>{book.name}</h2>
          <h3>Author: {book.author}</h3>
          <img src={book.image_url} alt={book.name} />
          <p>ISBN: {book.isbn}</p>
          <p>Release Date: {book.release_date}</p>
          {/* <button onClick={() => handleEdit(book.id)}>Edit Book</button> */}
          <button onClick={() => handleDelete(book.id)}>Delete Book</button>
        </div>
      ))}
    </div>
  );
}

export default Books;
