const { gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    bookId: ID!
    authors: [String]
    description: String!
    title: String!
    image: String!
    link: String
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
    me(userId: ID!): User
  }
  input LoginInput {
    email: String!
    password: String!
  }
  input NewUserInput {
    username: String!
    email: String!
    password: String!
  }
  input SaveBookInput {
    userId: String!
    authors: [String]
    description: String!
    title: String!
    bookId: Int!
    image: String!
    link: String!
  }
  input RemoveBookInput {
    userId: String!
    bookId: Int!
  }
  type Mutation {
    login(input: LoginInput!): Auth
    addUser(input: NewUserInput!): Auth
    saveBook(input: SaveBookInput!): User
    removeBook(input: RemoveBookInput!): User
  }
`;

module.exports = typeDefs;
