import express from 'express';
import {
  getAllAlbums,
  createAlbum,
  getAlbum,
  updateAlbum,
  deleteAlbum,
} from '../controllers/album.js';

const albumRouter = express.Router();

albumRouter.route('/').get(getAllAlbums).post(createAlbum);

albumRouter.route('/:id').get(getAlbum).put(updateAlbum).delete(deleteAlbum);

export default albumRouter;
