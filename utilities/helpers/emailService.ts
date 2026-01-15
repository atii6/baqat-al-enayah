import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_SENDER_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string
) => {
  try {
    await transporter.sendMail({
      from: `"GiftWell" <${process.env.EMAIL_SENDER}>`,
      to,
      subject,
      html: htmlContent,
    });
  } catch (error) {
    console.error("Email send error:", error);
    throw new Error("Failed to send email.");
  }
};
