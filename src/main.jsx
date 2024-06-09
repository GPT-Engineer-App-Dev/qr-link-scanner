import express from 'express';
import scrapeRouter from './api/scrape.js';

const app = express();
app.use(express.json());
app.use('/api', scrapeRouter);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});