const express = require('express');
const router = express.Router();

// Enhanced Sitemap.xml route for SEO with proper escaping and validation
router.get('/sitemap.xml', (req, res) => {
  const posts = require('../data/staticPosts');
  const baseUrl = process.env.BASE_URL || 'https://mintmoneyguide.com';

  const currentDate = new Date().toISOString().split('T')[0];

  // Helper to escape XML special characters
  const escapeXml = (str) => {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- Homepage - Highest Priority -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Blog Index - Very High Priority -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Subscribe Page - Important for conversions -->
  <url>
    <loc>${baseUrl}/subscribe</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- About Page -->
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Contact Page -->
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Privacy Policy -->
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <!-- Terms of Service -->
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
`;

  // Add all blog posts with dynamic priority based on recency and featured status
  const publishedPosts = posts.filter(p => p.published).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  publishedPosts.forEach((post, index) => {
    const postDate = new Date(post.publishedAt).toISOString().split('T')[0];
    const updatedDate = post.updatedAt ? new Date(post.updatedAt).toISOString().split('T')[0] : postDate;

    // Calculate priority: Featured posts and recent posts get higher priority
    const daysSincePublish = Math.floor((Date.now() - new Date(post.publishedAt)) / (1000 * 60 * 60 * 24));
    let priority = 0.8;
    if (post.featured) priority = 0.95;
    else if (daysSincePublish < 30) priority = 0.9;
    else if (daysSincePublish < 90) priority = 0.85;

    // Recent posts change more frequently
    const changefreq = daysSincePublish < 7 ? 'daily' : daysSincePublish < 30 ? 'weekly' : 'monthly';

    xml += `
  <!-- Blog Post: ${escapeXml(post.title)} -->
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${updatedDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(2)}</priority>
    <image:image>
      <image:loc>${escapeXml(post.featuredImage)}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
      <image:caption>${escapeXml(post.excerpt || post.metaDescription || '')}</image:caption>
    </image:image>
  </url>
`;
  });

  // Add category pages with post counts for better SEO
  const categories = [...new Set(posts.filter(p => p.published).map(post => post.category))];
  categories.forEach(category => {
    const categorySlug = category.toLowerCase().replace(/ /g, '-');
    const categoryPostCount = posts.filter(p => p.published && p.category === category).length;

    // Higher priority for categories with more posts
    const priority = categoryPostCount > 5 ? 0.75 : 0.7;

    xml += `
  <!-- Category: ${escapeXml(category)} (${categoryPostCount} posts) -->
  <url>
    <loc>${baseUrl}/category/${categorySlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority.toFixed(2)}</priority>
  </url>
`;
  });

  xml += `
</urlset>`;

  res.header('Content-Type', 'application/xml; charset=utf-8');
  res.header('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
  res.send(xml);
});

module.exports = router;
