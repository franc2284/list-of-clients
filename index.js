function toggleRow(e) {
  
  const src = (e && (e.currentTarget || e.target)) || this;
  const row = src.closest('.client-row');
  if (!row) return;
  row.classList.toggle('client-row--selected');
  if (e) e.stopPropagation();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.panel').addEventListener('click', (e) => {
    const checkbox = e.target.closest('.client-row__checkbox');
    if (!checkbox) return;
    toggleRow.call(checkbox, e);
  });
});
