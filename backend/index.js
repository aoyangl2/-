const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = [];

app.post('/api/register', (req, res) => {
  const user = req.body;
  user.id = uuidv4();
  users.push(user);
  res.status(201).send(user);
});

app.get('/api/users', (req, res) => {
  res.send(users);
});

app.delete('/api/users', (req, res) => {
  users = [];
  res.status(200).send({ message: 'All users deleted' });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
