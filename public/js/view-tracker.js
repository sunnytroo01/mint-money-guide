// View counter that tracks actual visits
(function() {
  // Check if we're on an article page
  const pathParts = window.location.pathname.split('/');
  if (pathParts[1] !== 'blog' || pathParts.length < 3) {
    return; // Not on an article page
  }

  // Get the post slug from URL
  const slug = pathParts[2];

  // Get the post ID from the page (we'll add it as a data attribute)
  const postElement = document.querySelector('[data-post-id]');
  if (!postElement) {
    return;
  }

  const postId = postElement.getAttribute('data-post-id');

  // Track that this user has viewed this article (prevent double counting on refresh)
  const viewedKey = `viewed_${postId}`;
  const hasViewed = sessionStorage.getItem(viewedKey);

  if (!hasViewed) {
    // Increment view count
    fetch(`/api/views/increment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Update the view count on the page
      const viewElements = document.querySelectorAll('.view-count');
      viewElements.forEach(el => {
        el.textContent = data.views || 0;
      });

      // Mark as viewed in this session
      sessionStorage.setItem(viewedKey, 'true');
    })
    .catch(error => {
      console.error('Failed to track view:', error);
    });
  }
})();
