const express = require("express");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const app = express();

const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");

app.use(express.json());

//This is how to use middleware with express.
app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    graphiql: true,
    rootValue: graphqlResolvers
  })
);

const PORT = 4000;

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster1-jkuro.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    app.listen(PORT, () => `Server running on port ${PORT}`);
  })
  .catch(err => console.log(err));
