const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../hellpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email ${email} already exist`);
  }

  const verificationToken = v4();
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<p>Welcome, </p><a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">click to confirm</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "created",
    code: 201,
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = signup;
