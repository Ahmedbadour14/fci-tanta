import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

async function getTransporter() {
  // Use real Gmail if configured
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Fallback: Ethereal fake SMTP for testing
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  console.log('Using Ethereal test account:', testAccount.user);
  return transporter;
}

export const sendContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Save to database
    const contact = await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    // Send email notification
    const transporter = await getTransporter();
    const info = await transporter.sendMail({
      from: `"FCI Tanta Website" <no-reply@fci.tanta.edu.eg>`,
      to: process.env.ADMIN_EMAIL || 'admin@fci.tanta.edu.eg',
      replyTo: email,
      subject: `[Contact Form] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1e3a5f; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin:0;">New Contact Form Submission</h2>
            <p style="margin:0; opacity:0.8;">Faculty of Computers & Information, Tanta University</p>
          </div>
          <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
            <table style="width:100%; border-collapse:collapse;">
              <tr><td style="padding:8px 0; font-weight:bold; color:#374151; width:30%;">Name:</td><td style="padding:8px 0; color:#6b7280;">${name}</td></tr>
              <tr><td style="padding:8px 0; font-weight:bold; color:#374151;">Email:</td><td style="padding:8px 0; color:#6b7280;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0; font-weight:bold; color:#374151;">Subject:</td><td style="padding:8px 0; color:#6b7280;">${subject}</td></tr>
            </table>
            <hr style="border:none; border-top:1px solid #e5e7eb; margin:16px 0;" />
            <h4 style="color:#374151; margin:0 0 8px;">Message:</h4>
            <p style="color:#6b7280; line-height:1.6;">${message}</p>
          </div>
        </div>
      `,
    });

    // Log Ethereal preview URL for testing
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log('📧 Ethereal preview URL:', previewUrl);
    }

    res.status(201).json({
      message: 'Message sent successfully',
      id: contact.id,
      ...(previewUrl ? { previewUrl } : {}),
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};

export const getContactMessages = async (_req: Request, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};
