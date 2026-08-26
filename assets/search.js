---
---
document.addEventListener('DOMContentLoaded', function () {

  const menuToggle = document.getElementById('menuToggle');
  const menuClose = document.getElementById('menuClose');
  const sideMenu = document.getElementById('sideMenu');

  // Open menu
  if (menuToggle && sideMenu) {
    menuToggle.addEventListener('click', function () {
      sideMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  // Close menu
  if (menuClose && sideMenu) {
    menuClose.addEventListener('click', function () {
      sideMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Search
  let articles = [];

  const searchUrl = '{{ "/search.json" | relative_url }}';

  fetch(searchUrl)
    .then(function (res) {
      if (!res.ok) {
        throw new Error('Search data could not be loaded.');
      }
      return res.json();
    })
    .then(function (data) {
      articles = data;
    })
    .catch(function (error) {
      console.error('Search error:', error);
    });

  const input = document.getElementById('siteSearch');
  const resultsBox = document.getElementById('searchResults');

  if (!input || !resultsBox) return;

  input.addEventListener('input', function () {

    const q = this.value.trim().toLowerCase();

    resultsBox.innerHTML = '';

    if (q.length < 2) return;

    const matches = articles
      .filter(function (article) {
        return article.title &&
          article.title.toLowerCase().includes(q);
      })
      .slice(0, 6);

    matches.forEach(function (article) {

      const link = document.createElement('a');

      link.href = article.url;
      link.textContent = article.title;

      resultsBox.appendChild(link);

    });

  });

});
