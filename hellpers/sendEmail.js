const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: "michael.paukov@gmail.com" };
  try {
    await sgMail.send(mail);
    return true;
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;
