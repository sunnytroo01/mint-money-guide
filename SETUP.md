# Mint Money Guide Blog - Complete Setup Guide

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
Copy `.env.example` to `.env` and update:
```env
NODE_ENV=development
PORT=7382
MONGODB_URI=mongodb://localhost:27017/wealthprompter
SESSION_SECRET=your-random-secret-key-here
DOMAIN=localhost:7382
```

### 3. Build Tailwind CSS
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run build:dev
```

### 4. Seed Database with Blog Posts
```bash
npm run seed
```

### 5. Start Development Server
```bash
npm run dev
```

Visit: http://localhost:7382

## Railway Deployment (Production)

### 1. Create Railway Project
- Go to https://railway.app
- Create new project
- Add MongoDB plugin

### 2. Set Environment Variables
```
NODE_ENV=production
MONGODB_URI=<from MongoDB plugin>
SESSION_SECRET=<generate secure random string>
DOMAIN=wealthprompter.com
```

### 3. Connect GitHub Repository
- Push code to GitHub
- Connect repository to Railway
- Railway will auto-deploy

### 4. Add Custom Domain
- In Railway settings, add: wealthprompter.com
- Update DNS records as instructed
- SSL certificate auto-generated

### 5. Seed Production Database
Run seed command once:
```bash
railway run npm run seed
```

## Project Structure

```
wealthprompter-blog/
├── server.js              # Main Express server
├── package.json
├── railway.json           # Railway deployment config
├── tailwind.config.js     # Tailwind CSS configuration
│
├── models/                # MongoDB schemas
│   ├── Post.js
│   ├── Subscriber.js
│   └── Contact.js
│
├── routes/                # Express routes
│   ├── index.js          # Homepage, about, contact, etc.
│   ├── blog.js           # Blog post routes
│   ├── api.js            # API endpoints
│   └── admin.js          # (Empty - no admin access)
│
├── controllers/           # Route handlers
│   ├── blogController.js
│   └── subscriberController.js
│
├── middleware/            # Custom middleware
│   └── errorHandler.js
│
├── utils/                 # Utility functions
│   ├── seo.js            # SEO meta tag generation
│   ├── sitemap.js        # XML sitemap generation
│   ├── rss.js            # RSS feed generation
│   └── slugify.js        # URL slug creation
│
├── public/                # Static assets
│   ├── css/
│   │   ├── input.css     # Tailwind source
│   │   └── output.css    # Compiled CSS (generated)
│   ├── js/
│   │   ├── main.js       # Core JavaScript
│   │   ├── darkmode.js   # Dark mode toggle
│   │   └── search.js     # Search functionality
│   └── images/           # Images and graphics
│
├── views/                 # EJS templates
│   ├── layouts/
│   │   └── main.ejs      # Main layout template
│   ├── partials/
│   │   ├── nav.ejs       # Navigation bar
│   │   ├── footer.ejs    # Footer
│   │   ├── header.ejs    # Page header
│   │   └── post-card.ejs # Blog post card component
│   ├── pages/
│   │   ├── home.ejs      # Homepage
│   │   ├── blog.ejs      # Blog listing
│   │   ├── post.ejs      # Individual blog post
│   │   ├── category.ejs  # Category archive
│   │   ├── search.ejs    # Search results
│   │   ├── about.ejs     # About page
│   │   ├── contact.ejs   # Contact page
│   │   ├── subscribe.ejs # Newsletter subscription
│   │   ├── 404.ejs       # 404 error page
│   │   └── error.ejs     # Generic error page
│   └── admin/            # (Not used - managed via GitHub)
│
└── data/
    └── seed-posts.js     # Database seeding script with blog posts
```

## Adding New Blog Posts

Since there's no admin panel, add posts via GitHub:

1. Edit `data/seed-posts.js`
2. Add new post object to the `posts` array
3. Commit and push to GitHub
4. Railway auto-deploys
5. Run seed command on Railway to update database

## SEO Features

✅ XML Sitemap: `/sitemap.xml`
✅ RSS Feed: `/rss.xml`
✅ Robots.txt: `/robots.txt`
✅ Schema.org markup on all pages
✅ Open Graph tags for social sharing
✅ Twitter Card tags
✅ Optimized meta titles and descriptions
✅ Canonical URLs
✅ Reading progress indicator on posts
✅ Lazy loading images

## Performance Optimizations

- Gzip compression enabled
- Minified CSS
- Image lazy loading
- CDN-ready static assets
- MongoDB indexing for fast queries
- Rate limiting on API endpoints

## Available Routes

### Public Routes
- `/` - Homepage
- `/blog` - All blog posts
- `/blog/:slug` - Individual post
- `/blog/search?q=query` - Search results
- `/category/:category` - Category archive
- `/about` - About page
- `/contact` - Contact page
- `/subscribe` - Newsletter subscription

### SEO Routes
- `/sitemap.xml` - XML sitemap
- `/rss.xml` - RSS feed
- `/robots.txt` - Robots file

### API Routes
- `POST /api/subscribe` - Newsletter subscription
- `POST /api/contact` - Contact form submission

## Brand Colors (Tailwind)

```javascript
primary: '#8B7355'    // Mocha Mousse
secondary: '#D4A574'  // Warm Gold
accent: '#2C5F2D'     // Forest Green
background: '#FAF8F5' // Soft Cream
```

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Templating:** EJS
- **Styling:** Tailwind CSS
- **Security:** Helmet.js
- **Performance:** Compression middleware
- **Deployment:** Railway
- **Version Control:** Git/GitHub

## Support

For issues or questions:
- Check this documentation
- Review Railway logs for deployment issues
- Verify MongoDB connection string
- Ensure all environment variables are set

## License

MIT
