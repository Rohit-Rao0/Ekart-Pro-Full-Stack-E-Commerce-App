import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


export const verifyEmail = async (token, email) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    }
  });
  const mailConfigration = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking on the following link: http://localhost:5173/verify/${token}`,
  };
  await transporter.sendMail(mailConfigration, (error, info) => {
    if (error) {
      console.log('Error occurred while sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response,token);
    }
  });
}

