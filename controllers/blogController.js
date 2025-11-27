const Post = require('../models/Post');
const { generateMetaTags, generateBlogPostSchema, generateBreadcrumbSchema } = require('../utils/seo');

async function getAllPosts(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ published: true })
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Post.countDocuments({ published: true });
    const totalPages = Math.ceil(total / limit);

    const meta = generateMetaTags({
      title: 'Blog - Expert Financial Advice & Wealth Building Strategies',
      description: 'Discover proven strategies for building wealth, investing wisely, and achieving financial independence through our comprehensive blog articles.',
      url: `${req.protocol}://${req.get('host')}/blog`,
      keywords: 'financial blog, wealth building, investment advice, money management'
    });

    res.render('pages/blog', {
      posts,
      currentPage: page,
      totalPages,
      meta,
      title: 'Blog'
    });
  } catch (err) {
    next(err);
  }
}

async function getPostBySlug(req, res, next) {
  try {
    const post = await Post.findOne({ slug: req.params.slug, published: true });

    if (!post) {
      return res.status(404).render('pages/404', {
        title: 'Post Not Found',
        path: req.path
      });
    }

    await post.incrementViews();

    const relatedPosts = await Post.find({
      published: true,
      category: post.category,
      _id: { $ne: post._id }
    })
    .limit(3)
    .sort({ publishedAt: -1 })
    .lean();

    const baseUrl = req.get('host');
    const meta = generateMetaTags({
      title: post.title,
      description: post.metaDescription,
      url: `${req.protocol}://${baseUrl}/blog/${post.slug}`,
      image: `${req.protocol}://${baseUrl}${post.featuredImage}`,
      keywords: post.keywords,
      type: 'article',
      author: post.author.name
    });

    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: post.category, url: `/category/${post.category.toLowerCase().replace(/\s+/g, '-')}` },
      { name: post.title, url: `/blog/${post.slug}` }
    ];

    const schema = {
      post: generateBlogPostSchema(post, baseUrl),
      breadcrumb: generateBreadcrumbSchema(breadcrumbs, baseUrl)
    };

    res.render('pages/post', {
      post,
      relatedPosts,
      meta,
      schema,
      breadcrumbs,
      title: post.title
    });
  } catch (err) {
    next(err);
  }
}

async function getPostsByCategory(req, res, next) {
  try {
    const categorySlug = req.params.category;
    const category = categorySlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ published: true, category })
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    if (posts.length === 0 && page === 1) {
      return res.status(404).render('pages/404', {
        title: 'Category Not Found',
        path: req.path
      });
    }

    const total = await Post.countDocuments({ published: true, category });
    const totalPages = Math.ceil(total / limit);

    const meta = generateMetaTags({
      title: `${category} - Financial Insights & Strategies`,
      description: `Explore our ${category.toLowerCase()} articles with expert advice and proven strategies for building wealth.`,
      url: `${req.protocol}://${req.get('host')}/category/${categorySlug}`,
      keywords: `${category.toLowerCase()}, financial advice, wealth building`
    });

    res.render('pages/category', {
      posts,
      category,
      categorySlug,
      currentPage: page,
      totalPages,
      meta,
      title: category
    });
  } catch (err) {
    next(err);
  }
}

async function searchPosts(req, res, next) {
  try {
    const query = req.query.q || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    if (!query) {
      return res.redirect('/blog');
    }

    const posts = await Post.find({
      published: true,
      $text: { $search: query }
    }, {
      score: { $meta: 'textScore' }
    })
    .sort({ score: { $meta: 'textScore' } })
    .skip(skip)
    .limit(limit)
    .lean();

    const total = await Post.countDocuments({
      published: true,
      $text: { $search: query }
    });

    const totalPages = Math.ceil(total / limit);

    const meta = generateMetaTags({
      title: `Search Results for "${query}"`,
      description: `Search results for ${query} on Mint Money Guide blog`,
      url: `${req.protocol}://${req.get('host')}/blog/search?q=${encodeURIComponent(query)}`
    });

    res.render('pages/search', {
      posts,
      query,
      currentPage: page,
      totalPages,
      meta,
      title: `Search: ${query}`
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllPosts,
  getPostBySlug,
  getPostsByCategory,
  searchPosts
};
