const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhhh";
const expiration = "2h";

const authenticate = (req) => {
  try {
    if (!req.headers.authorization) {
      return req;
    }

    let token = req.headers.authorization;
    token = token.split(" ").pop().trim();

    try {
      // verify token and get user data out of it
      const data = jwt.verify(token, secret, { maxAge: expiration });
      return data.data;
    } catch {
      throw AuthenticationError("Invalid token");
    }
  } catch {
    console.info(error);
    throw new ApolloError("Internal server error. Please try again soon");
  }
};

const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = {
  authenticate,
  signToken,
};
