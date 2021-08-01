const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

const authenticate = (req) => {
  console.log("authenticating");
  console.log("this is the request", req);
  const secret = "mysecretsshhhhh";
  const expiration = "2h";

  let token = req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    throw new AuthenticationError("user must be logged in");
  }

  // verify token and get user data out of it
  try {
    const { data: user } = jwt.verify(token, secret, { maxAge: expiration });
    console.log("this is the user from auth token", user);
    return { user };
  } catch {
    console.info(error);
    throw new ApolloError("Internal server error. Please try again soon");
  }
};

module.exports = authenticate;
