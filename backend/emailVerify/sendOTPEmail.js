import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();



export const sendOTPEmail=async(otp, email) => {
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
        subject: 'Reset Password ',
        html: `<p>Your OTP for password reset is: <b>${otp}</b>. It is valid for 10 minutes. Report to us if you did not request this.</p>`,
        
      };
      await transporter.sendMail(mailConfigration, (error, info) => {
        if (error) {
          console.log('Error occurred while sending email:', error);
        } else {
          console.log('Email sent successfully:', info.response,otp);
        }
      });
}