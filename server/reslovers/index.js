const {
  getSingleUser,
  createUser,
  login,
  saveBook,
  deleteBook,
} = require("./books");

const resolvers = {
  Query: {
    me: getSingleUser,
  },
  Mutation: {
    login,
    addUser: createUser,
    saveBook,
    removeBook: deleteBook,
  },
};

module.exports = resolvers;
