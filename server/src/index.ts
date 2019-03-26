import express from 'express';
import mongoose from 'mongoose';
import apolloServer from './apolloServer';

// Constants
const PORT = 4000;
const HOST = 'localhost';

function connectDB() {
  // Set up default mongoose connection
  const mongoDB = 'mongodb://localhost/demo';
  mongoose.connect(mongoDB, { useNewUrlParser: true });

  // Get the default connection
  const db = mongoose.connection;

  // Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

// App
const app = express();
apolloServer.applyMiddleware({ app });

app.get('/', (req, res) => {
  res.send('Hello world\n');
});

connectDB();

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
