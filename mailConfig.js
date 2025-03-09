import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail service, note lowercase
  auth: {
    user: process.env.EMAIL_USER, // Your email from environment variables
    pass: process.env.EMAIL_PASS, // Your email password from environment variables (app-specific password if using Gmail)
  },
  tls: {
    rejectUnauthorized: false, // Helps bypass any self-signed certificate errors
  },
});



export default transporter;