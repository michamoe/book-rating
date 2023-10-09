import { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
function CreateBook({ setBooks }) {
  const [newBook, setNewBook] = useState({
    name: '',
    author: '',
    isbn: '',
    release_date: '',
    image_url: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://example-xtvq.onrender.com/posts', newBook)
      .then((response) => {
        console.log('Success:', response.data);
        alert('Book created successfully!');
        setBooks((prevBooks) => [...prevBooks, response.data]);
        setNewBook({
          name: '',
          author: '',
          isbn: '',
          release_date: '',
          image_url: '',
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='name'
        value={newBook.name}
        onChange={handleChange}
        placeholder='Name'
        required
      />
      <input
        type='text'
        name='author'
        value={newBook.author}
        onChange={handleChange}
        placeholder='Author'
        required
      />
      <input
        type='text'
        name='isbn'
        value={newBook.isbn}
        onChange={handleChange}
        placeholder='ISBN'
        required
      />
      <input
        type='date'
        name='release_date'
        value={newBook.release_date}
        onChange={handleChange}
        required
      />
      <input
        type='text'
        name='image_url'
        value={newBook.image_url}
        onChange={handleChange}
        placeholder='Image URL'
        required
      />
      <button type='submit'>Create Book</button>
    </form>
  );
}

export default CreateBook;
