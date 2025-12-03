const express = require('express');
const router = express.Router();
const posts = require('../data/staticPosts');
const { generateMetaTags, generateOrganizationSchema } = require('../utils/seo');
const { generateSitemap } = require('../utils/sitemap');
const { generateRSS } = require('../utils/rss');

router.get('/', async (req, res, next) => {
  try {
    const featuredPosts = posts.filter(p => p.published).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).slice(0, 3);
    const recentPosts = posts.filter(p => p.published).slice(0, 6);
    const categories = [...new Set(posts.map(p => p.category))].map(cat => ({
      _id: cat,
      count: posts.filter(p => p.category === cat).length
    }));

    const baseUrl = req.get('host');
    const meta = generateMetaTags({
      title: 'Mint Money Guide - Build Wealth Through Smart Financial Strategies',
      description: 'Expert advice on investing, passive income, real estate, and wealth building. Learn proven strategies to achieve financial independence and build generational wealth.',
      url: `${req.protocol}://${baseUrl}`
    });

    const schema = generateOrganizationSchema(baseUrl);

    res.render('pages/home', {
      featuredPosts,
      recentPosts,
      popularPosts: [],
      categories,
      meta,
      schema,
      title: 'Home',
      layout: false
    });
  } catch (err) {
    next(err);
  }
});

router.get('/about', (req, res) => {
  const meta = generateMetaTags({
    title: 'About Mint Money Guide - Your Financial Success Partner',
    description: 'Learn about Mint Money Guide and our mission to help you achieve financial independence through expert advice and proven wealth-building strategies.',
    url: `${req.protocol}://${req.get('host')}/about`
  });

  res.render('pages/contact', {
    meta,
    title: 'About',
    layout: false
  });
});

router.get('/privacy', (req, res) => {
  res.render('pages/privacy', { title: 'Privacy Policy', layout: false });
});

router.get('/terms', (req, res) => {
  res.render('pages/terms', { title: 'Terms of Service', layout: false });
});

router.get('/sitemap.xml', async (req, res, next) => {
  try {
    const baseUrl = req.get('host');
    const xml = await generateSitemap(posts, baseUrl);

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    next(err);
  }
});

router.get('/rss.xml', async (req, res, next) => {
  try {
    const baseUrl = req.get('host');
    const xml = generateRSS(posts, baseUrl);

    res.header('Content-Type', 'application/rss+xml');
    res.send(xml);
  } catch (err) {
    next(err);
  }
});

router.get('/category/:category', async (req, res) => {
  const category = req.params.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const categoryPosts = posts.filter(p => p.category === category && p.published);

  res.render('pages/category', {
    category,
    posts: categoryPosts,
    currentPage: 1,
    totalPages: 1,
    meta: generateMetaTags({ title: `${category} - Mint Money Guide`, description: `${category} articles` }),
    title: category,
    layout: false
  });
});

router.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  res.send(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`);
});

module.exports = router;
