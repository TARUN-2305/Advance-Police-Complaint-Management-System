const nodemailer = require('nodemailer');

// In a real production environment, use SendGrid, SES, or Mailgun.
// For this system, we configure a transporter but default to Console Logging in generic setups
// to ensure no crashes without valid SMTP credentials.
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    auth: {
        user: process.env.SMTP_USER || 'test',
        pass: process.env.SMTP_PASS || 'test'
    }
});

const sendEmail = async (to, subject, text) => {
    // Audit Log for Email
    console.log(`[EMAIL_OUTBOUND] To: ${to} | Subject: ${subject}`);

    // If no real SMTP prod env, just return
    if (!process.env.SMTP_HOST) {
        return;
    }

    try {
        await transporter.sendMail({
            from: '"Police Info System" <no-reply@police.gov.in>',
            to,
            subject,
            text
        });
    } catch (e) {
        console.error("Email Delivery Failed:", e.message);
    }
};

module.exports = sendEmail;
