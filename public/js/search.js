let searchTimeout;

function debounceSearch(callback, delay) {
  return (...args) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => callback(...args), delay);
  };
}

const searchInput = document.getElementById('search-input');
if (searchInput) {
  searchInput.addEventListener('input', debounceSearch((e) => {
    const query = e.target.value.trim();
    if (query.length >= 3) {
      console.log('Searching for:', query);
    }
  }, 300));
}
