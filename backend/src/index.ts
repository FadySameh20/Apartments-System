import express, { json } from 'express';
const app = express();
const port = 3000;

// Middleware
app.use(json());

// Routes
app.get('/', (req, res) => {
  res.send('Backend Server...');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
