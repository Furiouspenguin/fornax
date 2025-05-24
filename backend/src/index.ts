import express from 'express';
import devicesRouter from './routes/devices';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/devices', devicesRouter)


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
