const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 300
  },
  content: {
    type: String,
    required: true
  },
  author: {
    name: {
      type: String,
      default: 'Mint Money Guide Team'
    },
    bio: {
      type: String,
      default: 'Expert financial advisors helping you build wealth through smart strategies and proven methods.'
    },
    avatar: {
      type: String,
      default: '/images/author-default.jpg'
    }
  },
  category: {
    type: String,
    required: true,
    enum: ['Investing', 'Passive Income', 'Real Estate', 'Cryptocurrency', 'Tax Strategies', 'Retirement', 'Side Hustles', 'Money Mindset', 'Wealth Building', 'Estate Planning']
  },
  tags: [{
    type: String,
    trim: true
  }],
  featuredImage: {
    type: String,
    required: true
  },
  keywords: {
    type: String,
    required: true
  },
  metaDescription: {
    type: String,
    required: true,
    maxlength: 160
  },
  readingTime: {
    type: Number,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

postSchema.index({ slug: 1 });
postSchema.index({ category: 1 });
postSchema.index({ published: 1, publishedAt: -1 });
postSchema.index({ title: 'text', content: 'text', tags: 'text' });

postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

postSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

module.exports = mongoose.model('Post', postSchema);
