import ErrorResponse from '../utils/ErrorResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import pool from '../db/server.js';

export const getAllAlbums = asyncHandler(async (req, res, next) => {
  const results = await pool.query('SELECT * FROM album');
  res.json(results.rows);
});

export const createAlbum = asyncHandler(async (req, res, next) => {
  const { name, band, record, rating } = req.body;
  const newEntry = await pool.query(
    'INSERT INTO album (name, band, record, rating) VALUES($1, $2, $3, $4) RETURNING *',
    [name, band, record, rating]
  );
  res.status(201).json(newEntry.rows[0]);
});

export const getAlbum = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM album WHERE id = $1', [id]);
  if (result.rows.length === 0) {
    return next(new ErrorResponse(`Album with id of ${id} doesn't exist`, 404));
  }
  res.json(result.rows[0]);
});

export const updateAlbum = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, band, record, rating } = req.body;
  const result = await pool.query(
    'UPDATE album SET name = $1, band = $2, record = $3, rating = $4 WHERE id = $5 RETURNING *',
    [name, band, record, rating, id]
  );
  if (result.rows.length === 0) {
    return next(new ErrorResponse(`Album with id of ${id} doesn't exist`, 404));
  }
  res.json(result.rows[0]);
});

export const deleteAlbum = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await pool.query(
    'DELETE FROM album WHERE id = $1 RETURNING *',
    [id]
  );
  if (result.rows.length === 0) {
    return next(new ErrorResponse(`Album with id of ${id} doesn't exist`, 404));
  }
  res.json({ success: `Album with id of ${id} was deleted` });
});
