const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema/schema');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
const dbString =
  process.env.NODE && process.env.NODE.indexOf('heroku') !== -1
    ? process.env.db
    : 'connection string';
mongoose.connect(
  dbString,
  { useNewUrlParser: true }
);

mongoose.connection.once(
  'open',
  () => {
    console.log('connected to db');
  },
  (error) => {
    console.log('error', error);
  }
);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
