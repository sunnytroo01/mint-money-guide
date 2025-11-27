const express = require('express');
const router = express.Router();
const posts = require('../data/staticPosts');
const { generateMetaTags, generateBlogPostSchema, generateBreadcrumbSchema } = require('../utils/seo');
const { findRelatedPosts } = require('../utils/internalLinking');

router.get('/', (req, res) => {
  const allPosts = posts.filter(p => p.published).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  res.render('pages/blog', {
    posts: allPosts,
    currentPage: 1,
    totalPages: 1,
    meta: generateMetaTags({ title: 'Blog - Mint Money Guide', description: 'Wealth building articles and guides' }),
    title: 'Blog'
  });
});

router.get('/search', (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  const results = posts.filter(p =>
    p.published && (p.title.toLowerCase().includes(query) || p.excerpt.toLowerCase().includes(query))
  );
  res.render('pages/search', {
    posts: results,
    query,
    currentPage: 1,
    totalPages: 1,
    meta: generateMetaTags({ title: `Search: ${query}`, description: 'Search results' }),
    title: 'Search'
  });
});

router.get('/:slug', async (req, res) => {
  const post = posts.find(p => p.slug === req.params.slug && p.published);
  if (!post) return res.status(404).render('pages/404');

  const relatedPosts = findRelatedPosts(post, posts, 3);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` }
  ];

  const baseUrl = req.get('host');
  const meta = generateMetaTags({
    title: post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.metaKeywords,
    url: `${req.protocol}://${baseUrl}/blog/${post.slug}`,
    imageUrl: post.featuredImage,
    type: 'article',
    twitterCard: 'summary_large_image',
    publishedTime: new Date(post.publishedAt).toISOString(),
    modifiedTime: new Date(post.updatedAt || post.publishedAt).toISOString(),
    author: post.author.name,
    section: post.category,
    tags: post.tags
  });

  const schema = {
    post: generateBlogPostSchema(post, baseUrl),
    breadcrumb: generateBreadcrumbSchema(breadcrumbs, baseUrl)
  };

  res.render('pages/post', {
    post,
    relatedPosts,
    breadcrumbs,
    meta,
    schema,
    title: post.title
  });
});

module.exports = router;
