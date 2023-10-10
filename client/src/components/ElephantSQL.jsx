import { useEffect, useState } from 'react';
import CreateAlbum from './CreateAlbum';
import axios from 'axios';

function Album() {
  const [album, setAlbum] = useState([]);

  const fetchAlbum = () => {
    axios
      .get('https://example-xtvq.onrender.com/posts')
      .then((response) => {
        setAlbum(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchAlbum();
  }, []);

  const handleDelete = async (albumId) => {
    await axios.delete(`https://example-xtvq.onrender.com/posts/${albumId}`);
    setAlbum((prevAlbum) => prevAlbum.filter((album) => album.id !== albumId));
    alert('Album is successfully deleted');
  };

  return (
    <div>
      <CreateAlbum setAlbum={setAlbum} />
      {album.map((album) => (
        <div key={album.id}>
          <h2>{album.name}</h2>
          <h3>Band: {album.band}</h3>
          <h3>Record: {album.record}</h3>
          <h3>Rating: {album.rating}</h3>
          {/* <button onClick={() => handleEdit(album.id)}>Edit album</button> */}
          <button onClick={() => handleDelete(album.id)}>Delete Album</button>
        </div>
      ))}
    </div>
  );
}

export default Album;
