const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;
const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "ukolova_e@meta.ua",
    pass: META_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(nodemailerConfig);
const email = {
  to: "tewisim185@meidir.com",
  from: "ukolova_e@meta.ua",
  subject: "New application from the site",
  html: "<p>A new application has been receivd from the site</p>",
};

transporter
  .sendMail(email)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));

const usersRouter = require("./routes/api/users.js");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
