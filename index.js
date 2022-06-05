import express from 'express';
import mongoose from 'mongoose';

import { db_url, port } from './config.js';
import routes from './routes.js';

const app = express();

// app.use(express.json());

routes(app);

mongoose
  .connect(db_url, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected!');
    server.listen({ port });
  })
  .then((res) => {
    console.log(`Serevr is running at ${res} on PORT ${port}`);
  });
