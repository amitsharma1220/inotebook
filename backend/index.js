//Express server setup
const express = require('express')
const app = express()
const port = 5000

const connectToMongoDB = require('./db');
connectToMongoDB();

//To use JSON Request Body
app.use(express.json());

//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNoteBook app listening on port ${port}`)
})