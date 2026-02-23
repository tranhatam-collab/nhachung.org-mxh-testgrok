const express = require('express');
const app = express();
app.use(express.json());

let posts = []; // Database giả ban đầu

app.get('/api/posts', (req, res) => res.json(posts));
app.post('/api/posts', (req, res) => {
  posts.push(req.body);
  res.status(201).send();
});

app.listen(3000, () => console.log('Server running'));
