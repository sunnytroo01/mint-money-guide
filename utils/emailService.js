const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  // Use Gmail SMTP
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send contact form email
async function sendContactEmail({ name, email, subject, message }) {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_EMAIL,
    replyTo: email, // User's email for easy reply
    subject: `Contact Form: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2C5F4F; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #2C5F4F; display: block; margin-bottom: 5px; }
          .value { background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #2C5F4F; }
          .message-box { background: white; padding: 20px; border-radius: 4px; border: 1px solid #ddd; margin-top: 10px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">📧 New Contact Form Submission</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Mint Money Guide Blog</p>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">👤 Name:</span>
              <div class="value">${name}</div>
            </div>

            <div class="field">
              <span class="label">✉️ Email:</span>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>

            <div class="field">
              <span class="label">📋 Subject:</span>
              <div class="value">${subject}</div>
            </div>

            <div class="field">
              <span class="label">💬 Message:</span>
              <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
            </div>

            <div class="footer">
              <p>You can reply directly to this email to respond to ${name}</p>
              <p>Sent from Mint Money Guide Contact Form</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
New Contact Form Submission
===========================

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
You can reply directly to this email to respond to ${name}
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email send error:', error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  sendContactEmail
};
