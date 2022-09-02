import express from 'express';

const app = express();

const port = 8080;

app.get('/', (req, res) => {
  res.send('hello from Viktor');
});

function greet(name: string) {
  console.log(name);
}
app.listen(port, () => {
  console.log('server started', port);
});
