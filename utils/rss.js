const RSS = require('rss');

function generateRSS(posts, baseUrl) {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const fullBaseUrl = `${protocol}://${baseUrl}`;

  const feed = new RSS({
    title: 'Mint Money Guide Blog',
    description: 'Expert advice on investing, passive income, real estate, and wealth building',
    feed_url: `${fullBaseUrl}/rss.xml`,
    site_url: fullBaseUrl,
    image_url: `${fullBaseUrl}/images/logo.png`,
    language: 'en',
    pubDate: new Date(),
    ttl: 60
  });

  posts.forEach(post => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${fullBaseUrl}/blog/${post.slug}`,
      categories: [post.category, ...post.tags],
      author: post.author.name,
      date: post.publishedAt,
      enclosure: {
        url: `${fullBaseUrl}${post.featuredImage}`,
        type: 'image/jpeg'
      }
    });
  });

  return feed.xml();
}

module.exports = { generateRSS };
