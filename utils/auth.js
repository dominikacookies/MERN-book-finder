const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhhh";
const expiration = "2h";

const authenticate = (req) => {
  try {
    if (!req.headers.authorization) {
      console.log("no headers");
      return req;
    }

    let token = req.headers.authorization;
    token = token.split(" ").pop().trim();
    console.log("this is the extracted token", token);

    try {
      // verify token and get user data out of it
      const data = jwt.verify(token, secret, { maxAge: expiration });
      console.log("this is the user I found", data);
      return data.data;
    } catch {
      console.log("invalid token");
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
