const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

async function generateSitemap(posts, baseUrl) {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const fullBaseUrl = `${protocol}://${baseUrl}`;

  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/blog', changefreq: 'daily', priority: 0.9 },
    { url: '/about', changefreq: 'monthly', priority: 0.7 },
    { url: '/contact', changefreq: 'monthly', priority: 0.6 },
    { url: '/subscribe', changefreq: 'monthly', priority: 0.6 }
  ];

  const categories = ['Investing', 'Passive Income', 'Real Estate', 'Cryptocurrency',
                     'Tax Strategies', 'Retirement', 'Side Hustles', 'Money Mindset',
                     'Wealth Building', 'Estate Planning'];

  categories.forEach(category => {
    links.push({
      url: `/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  posts.forEach(post => {
    links.push({
      url: `/blog/${post.slug}`,
      changefreq: 'weekly',
      priority: 0.85,
      lastmod: post.updatedAt
    });
  });

  const stream = new SitemapStream({ hostname: fullBaseUrl });
  const xml = await streamToPromise(Readable.from(links).pipe(stream));

  return xml.toString();
}

module.exports = { generateSitemap };
