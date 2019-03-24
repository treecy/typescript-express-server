import express from 'express';
import apolloServer from './apolloServer';
import { getUsers } from './controllers';

// Constants
const PORT = 4000;
const HOST = 'localhost';

// App
const app = express();
apolloServer.applyMiddleware({ app });

app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.get('/users', async (req, res) => getUsers());

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
