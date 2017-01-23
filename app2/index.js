const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('<h1>Hello Hell</h1>');
});

app.listen(3001, ()=> {
  console.log('App2 listens at port 3001');
});
