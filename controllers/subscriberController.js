const Subscriber = require('../models/Subscriber');
const Contact = require('../models/Contact');
const { sendContactEmail } = require('../utils/emailService');

async function subscribe(req, res) {
  try {
    const { email, name, source } = req.body;

    const existing = await Subscriber.findOne({ email });

    if (existing) {
      if (existing.active) {
        return res.status(400).json({
          success: false,
          message: 'This email is already subscribed.'
        });
      } else {
        existing.active = true;
        existing.subscribedAt = Date.now();
        await existing.save();

        return res.json({
          success: true,
          message: 'Welcome back! You have been re-subscribed.'
        });
      }
    }

    const subscriber = new Subscriber({
      email,
      name: name || '',
      source: source || 'homepage'
    });

    await subscriber.save();

    res.json({
      success: true,
      message: 'Thank you for subscribing! Check your email for confirmation.'
    });
  } catch (err) {
    console.error('Subscribe error:', err);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
}

async function submitContact(req, res) {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.'
      });
    }

    // Send email notification (priority)
    const emailResult = await sendContactEmail({
      name,
      email,
      subject,
      message
    });

    // Try to save to database (optional, don't fail if MongoDB is down)
    try {
      const contact = new Contact({
        name,
        email,
        subject,
        message,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });

      await Promise.race([
        contact.save(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Database timeout')), 3000))
      ]);

      console.log('💾 Contact saved to database');
    } catch (dbErr) {
      console.log('⚠️ Database save failed (MongoDB not running), but email sent successfully');
    }

    if (emailResult.success) {
      console.log('✅ Contact form email sent successfully');
      res.json({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
    } else {
      console.error('❌ Failed to send email:', emailResult.error);
      res.status(500).json({
        success: false,
        message: 'Failed to send your message. Please try again or email us directly.'
      });
    }
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
}

module.exports = {
  subscribe,
  submitContact
};
