import ErrorResponse from '../utils/ErrorResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import pool from '../db/server.js';

export const getAllPosts = asyncHandler(async (req, res, next) => {
  const results = await pool.query('SELECT * FROM posts');
  res.json(results.rows);
});

export const createPost = asyncHandler(async (req, res, next) => {
  const { name, author, isbn, release_date, image_url } = req.body;
  const newEntry = await pool.query(
    'INSERT INTO posts (name, author, isbn, release_date, image_url) VALUES($1, $2, $3, $4, $5) RETURNING *',
    [name, author, isbn, release_date, image_url]
  );
  res.status(201).json(newEntry.rows[0]);
});

export const getPost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  if (result.rows.length === 0) {
    return next(new ErrorResponse(`Post with id of ${id} doesn't exist`, 404));
  }
  res.json(result.rows[0]);
});

export const updatePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, author, isbn, releaseDate } = req.body;
  const result = await pool.query(
    'UPDATE posts SET name = $1, author = $2, isbn = $3, release_date = $4 WHERE id = $5 RETURNING *',
    [name, author, isbn, releaseDate, id]
  );
  if (result.rows.length === 0) {
    return next(new ErrorResponse(`Post with id of ${id} doesn't exist`, 404));
  }
  res.json(result.rows[0]);
});

export const deletePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await pool.query(
    'DELETE FROM posts WHERE id = $1 RETURNING *',
    [id]
  );
  if (result.rows.length === 0) {
    return next(new ErrorResponse(`Post with id of ${id} doesn't exist`, 404));
  }
  res.json({ success: `Post with id of ${id} was deleted` });
});
