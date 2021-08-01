const jwt = require("jsonwebtoken");

const authenticate = (req) => {
  try {
    const secret = "mysecretsshhhhh";
    const expiration = "2h";

    console.log(req.headers);

    if (!req.headers.authorization) {
      console.log("no headers");
      return;
    }

    let token = req.headers.authorization;
    token = token.split(" ").pop().trim();
    console.log(token);

    // verify token and get user data out of it
    const { data: user } = jwt.verify(token, secret, { maxAge: expiration });
    console.log("this is the user from auth token", user);
    return user;
  } catch {
    console.info(error);
    throw new ApolloError("Internal server error. Please try again soon");
  }
};

module.exports = authenticate;
