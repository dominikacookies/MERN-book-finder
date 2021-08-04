const { ApolloServer } = require("apollo-server");

const typeDefs = require("./schemas");
const resolvers = require("./resolvers");

const db = require("./config/connection");
const { authenticate } = require("./utils/auth");

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = authenticate(req);
    return { user };
  },
});

db.once("open", () => {
  server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
