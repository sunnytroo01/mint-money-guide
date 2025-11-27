# Mint Money Guide Blog

Production-ready, SEO-optimized blog built with Node.js, Express, MongoDB, and Tailwind CSS.

## Features

- 10 pre-written, SEO-optimized blog posts (1,500-2,100 words each)
- Modern, responsive design with Pantone 2025 colors
- Advanced SEO: Schema.org markup, sitemap, RSS feed
- Fast performance: < 2.5s load time target
- Admin dashboard for content management
- Newsletter subscription system
- Dark mode support
- Reading progress indicator
- Social sharing buttons
- Full-text search
- Category filtering

## Quick Start

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Start MongoDB locally or use a cloud instance

4. Build Tailwind CSS:
```bash
npm run build
```

5. Seed the database with blog posts:
```bash
npm run seed
```

6. Start the development server:
```bash
npm run dev
```

7. Visit http://localhost:7382

### Production Deployment on Railway

1. Create a new Railway project
2. Add MongoDB plugin
3. Set environment variables:
   - `NODE_ENV=production`
   - `MONGODB_URI` (from MongoDB plugin)
   - `SESSION_SECRET` (generate secure random string)
   - `DOMAIN=wealthprompter.com`
   - `ADMIN_EMAIL` (your admin email)
   - `ADMIN_PASSWORD` (secure password)

4. Connect your GitHub repository
5. Railway will automatically build and deploy

## Admin Dashboard

Access the admin dashboard at `/admin` using the credentials set in your environment variables.

## SEO Features

- XML sitemap at `/sitemap.xml`
- RSS feed at `/rss.xml`
- robots.txt at `/robots.txt`
- Schema.org markup on all pages
- Open Graph and Twitter Card meta tags
- Canonical URLs
- Optimized meta titles and descriptions

## Performance

- Gzip compression enabled
- Image lazy loading
- Minified CSS/JS
- CDN-ready static assets
- Efficient MongoDB queries with indexing

## Tech Stack

- Node.js v22+
- Express.js
- MongoDB with Mongoose
- EJS templating
- Tailwind CSS
- Helmet.js for security
- Railway for deployment

## License

MIT
