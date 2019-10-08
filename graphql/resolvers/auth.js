const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async args => {
    const { email, password } = args.userInput;
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        throw new Error("User already exists, please login.");
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        password: hashedPassword
      });
      const userResult = await newUser.save();

      return { ...userResult._doc, _id: userResult.id, password: null };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("User does not exist.");
      }
      //this compares the password sent on the request with the hashed password stored in the database.
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Invalid credentials");
      }
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email
        },
        "supersecretkey1",
        { expiresIn: "1h" }
      );
      return {
        userId: user.id,
        token: token,
        tokenExpiration: 1
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
