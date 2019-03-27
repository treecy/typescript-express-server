import express from 'express';
import mongoose from 'mongoose';
import apolloServer from './apolloServer';

// Constants
const PORT = process.env.PORT || 4002;
const HOST = process.env.HOST || 'localhost';
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';

function connectDB() {
  // Set up default mongoose connection
  const mongoDB = `mongodb://${MONGO_HOST}/demo`;
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

// connectDB();

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
