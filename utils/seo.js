function generateMetaTags(page) {
  const baseUrl = process.env.DOMAIN || 'localhost:7382';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  const defaults = {
    title: 'Mint Money Guide - Build Wealth Through Smart Financial Strategies',
    description: 'Expert advice on investing, passive income, real estate, and wealth building. Learn proven strategies to achieve financial independence and build generational wealth.',
    keywords: 'wealth building, investing, passive income, financial independence, money management, financial freedom, millionaire habits, real estate investing, stock market investing, side hustles, entrepreneurship, early retirement, FIRE movement, budgeting tips, money mindset',
    url: `${protocol}://${baseUrl}`,
    image: `${protocol}://${baseUrl}/images/og-default.jpg`,
    type: 'website',
    author: 'Mint Money Guide Team'
  };

  const meta = { ...defaults, ...page };

  if (meta.title !== defaults.title) {
    meta.title = `${meta.title} | Mint Money Guide`;
  }

  return {
    ...meta,
    canonical: meta.url,
    fullUrl: meta.url,
    imageUrl: meta.image,
    siteName: 'Mint Money Guide',
    twitterCard: 'summary_large_image'
  };
}

function generateBlogPostSchema(post, baseUrl) {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const fullBaseUrl = `${protocol}://${baseUrl}`;

  // Strip HTML to get accurate word count
  const textContent = post.content.replace(/<[^>]*>/g, '');
  const wordCount = textContent.trim().split(/\s+/).length;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${fullBaseUrl}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt || post.metaDescription,
    image: {
      '@type': 'ImageObject',
      url: post.featuredImage,
      width: 1200,
      height: 630
    },
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.updatedAt || post.publishedAt).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author.name || 'Mint Money Guide Team',
      description: post.author.bio || 'Expert financial strategist'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mint Money Guide',
      logo: {
        '@type': 'ImageObject',
        url: `${fullBaseUrl}/images/logo.png`,
        width: 600,
        height: 60
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${fullBaseUrl}/blog/${post.slug}`
    },
    keywords: post.tags ? post.tags.join(', ') : '',
    articleSection: post.category,
    articleBody: textContent.substring(0, 500),
    wordCount: wordCount,
    timeRequired: `PT${post.readingTime}M`,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    url: `${fullBaseUrl}/blog/${post.slug}`
  };
}

function generateOrganizationSchema(baseUrl) {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const fullBaseUrl = `${protocol}://${baseUrl}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mint Money Guide',
    url: fullBaseUrl,
    logo: `${fullBaseUrl}/images/logo.png`,
    description: 'Expert financial advice and wealth building strategies',
    sameAs: []
  };
}

function generateBreadcrumbSchema(breadcrumbs, baseUrl) {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const fullBaseUrl = `${protocol}://${baseUrl}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${fullBaseUrl}${crumb.url}`
    }))
  };
}

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function generateFAQSchema(faqs, baseUrl) {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const fullBaseUrl = `${protocol}://${baseUrl}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

function generateHowToSchema(steps, name, description, baseUrl) {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const fullBaseUrl = `${protocol}://${baseUrl}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url ? `${fullBaseUrl}${step.url}` : undefined
    }))
  };
}

function generateWebPageSchema(page, baseUrl) {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const fullBaseUrl = `${protocol}://${baseUrl}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${fullBaseUrl}${page.url}#webpage`,
    url: `${fullBaseUrl}${page.url}`,
    name: page.title,
    description: page.description,
    publisher: {
      '@type': 'Organization',
      name: 'Mint Money Guide'
    },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'ReadAction',
      target: [`${fullBaseUrl}${page.url}`]
    }
  };
}

module.exports = {
  generateMetaTags,
  generateBlogPostSchema,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  calculateReadingTime,
  generateFAQSchema,
  generateHowToSchema,
  generateWebPageSchema
};
