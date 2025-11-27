// Internal linking utility for SEO boost
function findRelatedPosts(currentPost, allPosts, limit = 3) {
  const scoredPosts = allPosts
    .filter(post => post._id !== currentPost._id && post.published)
    .map(post => {
      let score = 0;

      // Same category gets highest score
      if (post.category === currentPost.category) {
        score += 10;
      }

      // Matching tags
      const commonTags = post.tags.filter(tag => currentPost.tags.includes(tag));
      score += commonTags.length * 3;

      // Matching keywords
      const currentKeywords = currentPost.metaKeywords.split(',').map(k => k.trim().toLowerCase());
      const postKeywords = post.metaKeywords.split(',').map(k => k.trim().toLowerCase());
      const commonKeywords = currentKeywords.filter(k => postKeywords.includes(k));
      score += commonKeywords.length * 2;

      // Recency bonus (newer posts get slight boost)
      const daysDiff = Math.abs(new Date(currentPost.publishedAt) - new Date(post.publishedAt)) / (1000 * 60 * 60 * 24);
      if (daysDiff < 30) score += 2;
      else if (daysDiff < 90) score += 1;

      return { post, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);

  return scoredPosts;
}

function generateInternalLinks(content, allPosts, currentPostSlug) {
  // Find keywords in content that match other post titles or topics
  const relevantPosts = allPosts
    .filter(post => post.published && post.slug !== currentPostSlug)
    .filter(post => {
      // Check if post title appears in content
      const titleWords = post.title.toLowerCase().split(' ').filter(w => w.length > 4);
      return titleWords.some(word => content.toLowerCase().includes(word));
    })
    .slice(0, 5);

  return relevantPosts.map(post => ({
    title: post.title,
    url: `/blog/${post.slug}`,
    category: post.category
  }));
}

function addContextualLinks(content, suggestedLinks) {
  // This would be used to automatically inject contextual links
  // For now, returns suggested links that can be manually added
  return suggestedLinks;
}

module.exports = {
  findRelatedPosts,
  generateInternalLinks,
  addContextualLinks
};
