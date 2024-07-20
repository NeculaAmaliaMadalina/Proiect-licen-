const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const registerEmail = async (userEmail, user) => {
  try {
    const emailToken = user.generateRegisterToken();

    let mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Magic outlentify",
        link: `${process.env.EMAIL_MAIL_URL}`,
      },
    });

    const email = {
      body: {
        name: userEmail,
        intro:
          "Welcome to Magic Outlentify! We're very excited to have you on board!",
        action: {
          instructions: "To get validate your account, please click here:",
          button: {
            color: "#1a73e8",
            text: "Confirm your account",
            link: `${process.env.SITE_DOMAIN}sign_in`,
          },
        },
        outro:
          "Need help, or have questions? Just  reply to this email, we'd love to help.",
      },
    };

    let emailBody = mailGenerator.generate(email);
    let message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Welcome to Magic Outlentify",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return true;
  } catch (error) {
    throw error;
  }
};

const addOrderEmail = async (userEmail) => {
  try {
    let mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Magic outlentify",
        link: `${process.env.EMAIL_MAIL_URL}`,
      },
    });

    const email = {
      body: {
        name: userEmail,
        intro:
          "Thank you for your order! Your order  will be delivered as soon as possible. To see the invoice details, you can download the invoice from your account.",
        action: {
          instructions: "To view your account, please click here:",
          button: {
            color: "#1a73e8",
            text: "View my account",
            link: `${process.env.SITE_DOMAIN}profile`,
          },
        },
        outro:
          "Need help, or have questions? Just  reply to this email, we'd love to help.",
      },
    };

    let emailBody = mailGenerator.generate(email);
    let message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Order Confirmation - Magic Outlentify",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return true;
  } catch (error) {
    throw error;
  }
};
const resetPassword = async (userEmail, user, token) => {
  try {
    let mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Magic outlentify",
        link: `${process.env.EMAIL_MAIL_URL}`,
      },
    });

    const email = {
      body: {
        name: userEmail,
        action: {
          instructions: "To reset your password, please click here:",
          button: {
            color: "#1a73e8",
            text: "Reset password",
            link: `${process.env.SITE_DOMAIN}reset_password/${token}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    let emailBody = mailGenerator.generate(email);
    let message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Reset password",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return true;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  registerEmail,
  addOrderEmail,
  resetPassword,
};
