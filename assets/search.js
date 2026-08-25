document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const menuClose = document.getElementById('menuClose');
  const sideMenu = document.getElementById('sideMenu');

  menuToggle.addEventListener('click', () => sideMenu.classList.add('open'));
  menuClose.addEventListener('click', () => sideMenu.classList.remove('open'));

  let articles = [];
  fetch('/business4k/search.json')
    .then(res => res.json())
    .then(data => { articles = data; });

  const input = document.getElementById('siteSearch');
  const resultsBox = document.getElementById('searchResults');

  input.addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    resultsBox.innerHTML = '';
    if (q.length < 2) return;
    const matches = articles.filter(a => a.title.toLowerCase().includes(q)).slice(0, 6);
    matches.forEach(a => {
      const link = document.createElement('a');
      link.href = a.url;
      link.textContent = a.title;
      resultsBox.appendChild(link);
    });
  });
});
