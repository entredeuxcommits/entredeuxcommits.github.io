(() => {
  const form = document.querySelector('.search-form');
  const input = document.getElementById('guide-search');
  const cards = [...document.querySelectorAll('.guide-card')];
  if (!form || !input || cards.length === 0) return;
  const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr-FR');
  const entries = cards.map((card) => ({ card, text: normalize(card.dataset.search || '') }));
  const count = document.getElementById('guide-count');
  const status = document.getElementById('search-status');
  const clear = document.getElementById('clear-search');
  const empty = document.getElementById('empty-state');
  // La recherche devient utile à mesure que le catalogue grandit.
  form.hidden = cards.length < 4;
  const search = () => {
    const terms = normalize(input.value.trim()).split(/\s+/).filter(Boolean);
    let found = 0;
    for (const { card, text } of entries) {
      card.hidden = !terms.every((term) => text.includes(term));
      if (!card.hidden) found++;
    }
    const label = terms.length ? `${found} guide${found > 1 ? 's' : ''} trouvé${found > 1 ? 's' : ''}` : `${found} guide${found > 1 ? 's' : ''} disponible${found > 1 ? 's' : ''}`;
    count.textContent = label;
    status.textContent = label;
    empty.hidden = found > 0;
    clear.hidden = input.value.length === 0;
  };
  const reset = () => { input.value = ''; search(); input.focus(); };
  form.addEventListener('submit', (event) => { event.preventDefault(); search(); });
  input.addEventListener('input', search);
  clear.addEventListener('click', reset);
  document.getElementById('reset-search').addEventListener('click', reset);
})();
