import { json, type RequestHandler } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { GMAIL, NAME } from '$lib/data/constants';

export const POST: RequestHandler = async ({ request }) => {
  const { name, email, subject, message } = await request.json();

  if (!name || !email || !subject || !message) {
    return json({ error: 'All fields are required' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email to site owner
  const ownerMailOptions = {
    from: process.env.EMAIL_USER,
    to: GMAIL,
    subject: `New Contact Form Submission: ${subject}`,
    text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
    `,
  };

  // Email to user (confirmation)
  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Confirmation: ${subject}`,
    text: `
      Dear ${name},

      Thank you for reaching out! I have received your message with the following details:

      Subject: ${subject}
      Message: ${message}

      I will get back to you soon at ${email}. If you have any further questions, feel free to reply to this email.

      Best regards,
      ${NAME}
    `,
  };

  try {
    // Send email to site owner
    await transporter.sendMail(ownerMailOptions);
    // Send confirmation email to user
    await transporter.sendMail(userMailOptions);
    return json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return json({ error: 'Failed to send email' }, { status: 500 });
  }
};
