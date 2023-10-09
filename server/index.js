import express from 'express';
import cors from 'cors';
import postsRouter from './routes/postsRouter.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: '*' })); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse incoming requests with JSON payloads

app.use('/posts', postsRouter);

// Server start
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
