import nodemailer from "nodemailer"

// Create a transporter using SMTP
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendMail = async (
  to: string,
  subject: string,
  html: string
) => {
  const info = await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html,
  });

  console.log("Message sent:", info.messageId);
  console.log("Response:", info.response);
  console.log("Accepted:", info.accepted);
  console.log("Rejected:", info.rejected);

  return info;
};