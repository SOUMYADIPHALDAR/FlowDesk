import nodemailer from "nodemailer";

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (!emailUser || !emailPass) {
  throw new Error(
    "EMAIL_USER and EMAIL_PASS must be defined in your .env file."
  );
}

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export async function verifyTransporter() {
  try {
    await transporter.verify();
    console.log("✅ Gmail transporter is ready.");
  } catch (error) {
    console.error("❌ Gmail transporter error:", error);
  }
}