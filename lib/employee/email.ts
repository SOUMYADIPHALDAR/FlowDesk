import nodemailer from "nodemailer";

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

export class EmailConfigurationError extends Error {
  constructor() {
    super("Email is not configured. Set EMAIL_USER and EMAIL_PASS.");
    this.name = "EmailConfigurationError";
  }
}

export function getTransporter() {
  if (!emailUser || !emailPass) {
    throw new EmailConfigurationError();
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
}

export async function verifyTransporter() {
  try {
    await getTransporter().verify();
    console.log("✅ Gmail transporter is ready.");
  } catch (error) {
    console.error("❌ Gmail transporter error:", error);
  }
}
