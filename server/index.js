import express from 'express';
import cors from 'cors';
import albumRouter from './routes/albumRouter.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: '*' })); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse incoming requests with JSON payloads

app.use('/album', albumRouter);

// Server start
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
