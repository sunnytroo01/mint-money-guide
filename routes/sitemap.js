const express = require('express');
const router = express.Router();

// Sitemap.xml route for SEO
router.get('/sitemap.xml', (req, res) => {
  const posts = require('../data/staticPosts');
  const baseUrl = process.env.BASE_URL || 'https://mintmoneyguide.com';

  const currentDate = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Blog Index -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
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

  // Add all blog posts
  posts.forEach(post => {
    if (post.published) {
      const postDate = new Date(post.publishedAt).toISOString().split('T')[0];
      xml += `
  <!-- Blog Post: ${post.title} -->
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${post.featuredImage}</image:loc>
      <image:title>${post.title}</image:title>
    </image:image>
  </url>
`;
    }
  });

  // Add category pages
  const categories = [...new Set(posts.map(post => post.category))];
  categories.forEach(category => {
    const categorySlug = category.toLowerCase().replace(/ /g, '-');
    xml += `
  <!-- Category: ${category} -->
  <url>
    <loc>${baseUrl}/category/${categorySlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  xml += `
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

module.exports = router;
