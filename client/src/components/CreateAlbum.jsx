import { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
function CreateAlbum({ setAlbum }) {
  const [newAlbum, setNewAlbum] = useState({
    name: '',
    band: '',
    record: '',
    rating: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://example-xtvq.onrender.com/posts', newAlbum)
      .then((response) => {
        console.log('Success:', response.data);
        alert('Album created successfully!');
        setAlbum((prevAlbum) => [...prevAlbum, response.data]);
        setNewAlbum({
          name: '',
          band: '',
          album: '',
          rating: '',
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleChange = (e) => {
    setNewAlbum({ ...newAlbum, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='name'
        value={newAlbum.name}
        onChange={handleChange}
        placeholder='Name'
        required
      />
      <input
        type='text'
        name='band'
        value={newAlbum.band}
        onChange={handleChange}
        placeholder='Band'
        required
      />
      <input
        type='text'
        name='record'
        value={newAlbum.record}
        onChange={handleChange}
        placeholder='Record'
        required
      />
      <input
        type='integer'
        name='rating'
        value={newAlbum.rating}
        onChange={handleChange}
        placeholder='Rating'
        required
      />
      <button type='submit'>Create Album</button>
    </form>
  );
}

export default CreateAlbum;
