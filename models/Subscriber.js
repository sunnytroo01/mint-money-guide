const mongoose = require('mongoose');
const validator = require('validator');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email address'
    }
  },
  name: {
    type: String,
    trim: true
  },
  active: {
    type: Boolean,
    default: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  unsubscribedAt: {
    type: Date
  },
  source: {
    type: String,
    enum: ['homepage', 'blog-post', 'footer', 'subscribe-page'],
    default: 'homepage'
  }
}, {
  timestamps: true
});

subscriberSchema.index({ email: 1 });
subscriberSchema.index({ active: 1 });

subscriberSchema.methods.unsubscribe = function() {
  this.active = false;
  this.unsubscribedAt = Date.now();
  return this.save();
};

module.exports = mongoose.model('Subscriber', subscriberSchema);
