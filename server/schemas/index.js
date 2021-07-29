const { gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    bookId: ID!
    authors: [String]!
    description: String!
    title: String!
    image: String!
    link: String!
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int!
    savedBooks: [Book]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      authors: Array!
      description: String!
      title: String!
      bookId: Int!
      image: String!
      link: String!
    ): User
    removeBook(bookId: Int!): User
  }
`;

module.exports = typeDefs;