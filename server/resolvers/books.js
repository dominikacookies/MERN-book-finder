// import user model
const {
  AuthenticationError,
  ApolloError,
  UserInputError,
} = require("apollo-server");
const { User } = require("../models");
// import sign token function from auth
const { signToken } = require("../utils/auth");

module.exports = {
  // get a user's information
  async getSingleUser(_, { userId }) {
    const foundUser = await User.findOne({ _id: userId });
    console.log("found user:", foundUser);

    if (!foundUser) {
      return res
        .status(400)
        .json({ message: "Cannot find a user with this id!" });
    }
    return foundUser;
  },

  // create a new user
  async createUser(_, { input }) {
    try {
      const user = await User.create(input);

      if (!user) {
        throw new UserInputError(
          "Could not create user. Ensure email and username are unique"
        );
      }

      const token = signToken(user);

      const auth = {
        user,
        token,
      };

      return auth;
    } catch (error) {
      console.info(error);
      throw new ApolloError("Internal server error. Please try again soon");
    }
  },

  // log a user in
  async login(_, { input }) {
    try {
      const user = await User.findOne({ email: input.email });

      console.log(user);

      if (!user) {
        throw new AuthenticationError("User does not exist");
      }

      const correctPw = await user.isCorrectPassword(input.password);

      if (!correctPw) {
        return res.status(400).json({ message: "Wrong password!" });
      }

      const token = signToken(user);
      console.log("logged in:", user, token);

      const auth = {
        user,
        token,
      };

      return auth;
    } catch (error) {
      console.info(error);
      throw new ApolloError("Internal server error. Please try again soon");
    }
  },

  // save a new book for a specific user
  async saveBook(_, { input }) {
    try {
      const { userId, authors, description, title, bookId, image, link } =
        input;

      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: {
            savedBooks: {
              authors,
              description,
              title,
              bookId,
              image,
              link,
            },
          },
        },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        throw new AuthenticationError("User does not exist");
      }

      return updatedUser;
    } catch (err) {
      console.info(error);
      throw new ApolloError("Internal server error. Please try again soon");
    }
  },
  // remove a book from `savedBooks`
  async deleteBook(_, { input }) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: input.userId },
        { $pull: { savedBooks: { bookId: input.bookId } } },
        { new: true }
      );

      if (!updatedUser) {
        throw new AuthenticationError("User does not exist");
      }

      return updatedUser;
    } catch (error) {
      console.info(error);
      throw new ApolloError("Internal server error. Please try again soon");
    }
  },
};