'use server';

import nodemailer from 'nodemailer';

export async function sendTestEmail(to?: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: to ?? process.env.SMTP_USER,
    subject: 'Test SMTP',
    text: 'Ça marche !',
  });

  return info.messageId;
}
