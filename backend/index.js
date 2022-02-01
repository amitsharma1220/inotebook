const connectToMongoDB = require('./db');
const express = require('express')

connectToMongoDB();
const app = express()
const port = 5000

//To use JSON Request Body
app.use(express.json());

//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})