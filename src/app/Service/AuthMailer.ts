import nodemailer from 'nodemailer';

const sendEmail = async (email: string, subject: string, text: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_AUTH_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_AUTH_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_HOST_USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

export const AuthMailer = {
    sendEmail
};