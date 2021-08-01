const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

const authenticate = (req) => {
  try {
    const secret = "mysecretsshhhhh";
    const expiration = "2h";

    if (!req.headers.authorization) {
      return;
    }

    let token = req.headers.authorization;
    token = token.split(" ").pop().trim();

    // verify token and get user data out of it
    const { data: user } = jwt.verify(token, secret, { maxAge: expiration });
    console.log("this is the user from auth token", user);
    return { user };
  } catch {
    console.info(error);
    throw new ApolloError("Internal server error. Please try again soon");
  }
};

module.exports = authenticate;
