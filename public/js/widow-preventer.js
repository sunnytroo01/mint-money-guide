/**
 * Simple and Effective Widow Preventer
 * Adds non-breaking spaces between the last 2-3 words to prevent orphans
 */

(function() {
  'use strict';

  const DEBUG = true;

  function log(...args) {
    if (DEBUG) console.log('[Widow Fix]', ...args);
  }

  /**
   * Fix widows in a text element
   */
  function fixWidow(element) {
    // Skip if no text or already processed
    if (!element.textContent.trim() || element.dataset.widowFixed) {
      return;
    }

    const originalHTML = element.innerHTML;

    // Skip if has HTML tags (too complex for simple replacement)
    if (/<[^>]+>/.test(originalHTML) && !/<br\s*\/?>|<strong>|<\/strong>|<em>|<\/em>/i.test(originalHTML)) {
      return;
    }

    const text = element.textContent.trim();
    const words = text.split(/\s+/);

    // Need at least 3 words
    if (words.length < 3) {
      return;
    }

    // Replace last 2-3 regular spaces with non-breaking spaces
    let fixed = originalHTML;

    // Simple regex to find last few spaces
    // Replace last 2 spaces with &nbsp;
    const spaceMatches = [];
    let regex = /\s+/g;
    let match;

    while ((match = regex.exec(originalHTML)) !== null) {
      spaceMatches.push({
        index: match.index,
        length: match[0].length,
        space: match[0]
      });
    }

    if (spaceMatches.length >= 2) {
      // Replace last 2 spaces with nbsp
      const last = spaceMatches[spaceMatches.length - 1];
      const secondLast = spaceMatches[spaceMatches.length - 2];

      // Build new HTML with nbsp
      fixed = originalHTML.substring(0, secondLast.index) +
              '&nbsp;' +
              originalHTML.substring(secondLast.index + secondLast.length, last.index) +
              '&nbsp;' +
              originalHTML.substring(last.index + last.length);

      element.innerHTML = fixed;
      element.dataset.widowFixed = 'true';

      log('Fixed:', element.tagName, '-', words.slice(-3).join(' '));
      return true;
    }

    return false;
  }

  /**
   * Process all elements
   */
  function processAll() {
    log('Starting widow prevention...');

    const selectors = [
      'article p',
      'article h2',
      'article h3',
      'article li',
      '.prose-custom p',
      '.prose-custom h2',
      '.prose-custom h3',
      '.prose-custom li'
    ];

    let fixed = 0;
    let processed = 0;

    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        // Skip hidden elements
        if (el.offsetParent === null) return;

        processed++;
        if (fixWidow(el)) {
          fixed++;
        }
      });
    });

    log(`Processed ${processed} elements, fixed ${fixed} widows`);
  }

  /**
   * Initialize
   */
  function init() {
    // Wait for DOM and fonts
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(processAll, 200);
      });
    } else {
      setTimeout(processAll, 200);
    }

    // Re-process on resize (debounced)
    let timeout;
    window.addEventListener('resize', () => {
      // Clear all fixed flags on resize
      document.querySelectorAll('[data-widow-fixed]').forEach(el => {
        delete el.dataset.widowFixed;
        // Reload original from data attribute if exists
      });

      clearTimeout(timeout);
      timeout = setTimeout(processAll, 300);
    });
  }

  init();
})();
