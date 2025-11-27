const bcrypt = require('bcryptjs');
const Post = require('../models/Post');
const Subscriber = require('../models/Subscriber');
const Contact = require('../models/Contact');
const { createSlug } = require('../utils/slugify');
const { calculateReadingTime } = require('../utils/seo');

async function showLogin(req, res) {
  res.render('admin/login', {
    title: 'Admin Login',
    error: null
  });
}

async function handleLogin(req, res) {
  const { email, password } = req.body;

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    req.session.adminEmail = email;
    return res.redirect('/admin/dashboard');
  }

  res.render('admin/login', {
    title: 'Admin Login',
    error: 'Invalid credentials'
  });
}

async function handleLogout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/admin/login');
  });
}

async function showDashboard(req, res, next) {
  try {
    const postsCount = await Post.countDocuments();
    const publishedCount = await Post.countDocuments({ published: true });
    const subscribersCount = await Subscriber.countDocuments({ active: true });
    const contactsCount = await Contact.countDocuments({ status: 'new' });

    const recentPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const popularPosts = await Post.find({ published: true })
      .sort({ views: -1 })
      .limit(5)
      .lean();

    res.render('admin/dashboard', {
      title: 'Dashboard',
      stats: {
        postsCount,
        publishedCount,
        subscribersCount,
        contactsCount
      },
      recentPosts,
      popularPosts
    });
  } catch (err) {
    next(err);
  }
}

async function listPosts(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Post.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.render('admin/posts', {
      title: 'Manage Posts',
      posts,
      currentPage: page,
      totalPages
    });
  } catch (err) {
    next(err);
  }
}

async function showCreatePost(req, res) {
  res.render('admin/post-editor', {
    title: 'Create Post',
    post: null,
    action: 'create'
  });
}

async function handleCreatePost(req, res, next) {
  try {
    const { title, excerpt, content, category, tags, featuredImage, keywords, metaDescription, published } = req.body;

    const slug = createSlug(title);
    const readingTime = calculateReadingTime(content);

    const post = new Post({
      title,
      slug,
      excerpt,
      content,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      featuredImage,
      keywords,
      metaDescription,
      readingTime,
      published: published === 'on'
    });

    await post.save();
    res.redirect('/admin/posts');
  } catch (err) {
    next(err);
  }
}

async function showEditPost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id).lean();

    if (!post) {
      return res.status(404).send('Post not found');
    }

    res.render('admin/post-editor', {
      title: 'Edit Post',
      post,
      action: 'edit'
    });
  } catch (err) {
    next(err);
  }
}

async function handleUpdatePost(req, res, next) {
  try {
    const { title, excerpt, content, category, tags, featuredImage, keywords, metaDescription, published } = req.body;

    const slug = createSlug(title);
    const readingTime = calculateReadingTime(content);

    await Post.findByIdAndUpdate(req.params.id, {
      title,
      slug,
      excerpt,
      content,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      featuredImage,
      keywords,
      metaDescription,
      readingTime,
      published: published === 'on',
      updatedAt: Date.now()
    });

    res.redirect('/admin/posts');
  } catch (err) {
    next(err);
  }
}

async function handleDeletePost(req, res, next) {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/admin/posts');
  } catch (err) {
    next(err);
  }
}

async function listSubscribers(req, res, next) {
  try {
    const subscribers = await Subscriber.find()
      .sort({ subscribedAt: -1 })
      .lean();

    res.render('admin/subscribers', {
      title: 'Subscribers',
      subscribers
    });
  } catch (err) {
    next(err);
  }
}

async function listContacts(req, res, next) {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .lean();

    res.render('admin/contacts', {
      title: 'Contact Messages',
      contacts
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  showLogin,
  handleLogin,
  handleLogout,
  showDashboard,
  listPosts,
  showCreatePost,
  handleCreatePost,
  showEditPost,
  handleUpdatePost,
  handleDeletePost,
  listSubscribers,
  listContacts
};
