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


function toggleRow(e) {
  const src = (e && (e.currentTarget || e.target)) || this;
  const row = src.closest('.client-row');
  if (!row) return;
  row.classList.toggle('client-row--selected');
  if (e) e.stopPropagation();
  updateHeaderCheckbox();
}


function toggleAll(e) {
  if (e) e.stopPropagation();
  const header = (e && (e.currentTarget || e.target)) || document.querySelector('.columns__checkbox');
  const rows = document.querySelectorAll('.client-row');
  const allSelected = [...rows].every(r => r.classList.contains('client-row--selected'));
  
  rows.forEach(r => r.classList.toggle('client-row--selected', !allSelected));
  updateHeaderCheckbox();
}


function updateHeaderCheckbox() {
  const header = document.querySelector('.columns__checkbox');
  if (!header) return;
  const rows = document.querySelectorAll('.client-row');
  if (rows.length === 0) {
    header.classList.remove('columns__checkbox--selected');
    return;
  }
  const selectedCount = document.querySelectorAll('.client-row.client-row--selected').length;
  
  if (selectedCount === rows.length) {
    header.classList.add('columns__checkbox--selected');
  } else {
    header.classList.remove('columns__checkbox--selected');
  }
}


document.addEventListener('DOMContentLoaded', () => {
  
  document.querySelector('.panel').addEventListener('click', (e) => {
    const checkbox = e.target.closest('.client-row__checkbox');
    if (checkbox) {
      toggleRow.call(checkbox, e);
    }
  });

  updateHeaderCheckbox();
});

const users = JSON.parse(localStorage.getItem('users')) || [];
console.log(users);

function toggleMenu(btn) {
  const row = btn.closest('.client-row');
  if (!row) return;

  const menu = row.querySelector('.row-menu');
  if (!menu) return;

  document.querySelectorAll('.row-menu').forEach(m => {
    if (m !== menu) m.style.display = 'none';
  });

  menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

document.addEventListener('click', (e) => {
  const delBtn = e.target.closest('.row-menu__btn2');
  if (!delBtn) return;

  const row = delBtn.closest('.client-row');
  if (!row) return;

  row.remove();

  document.querySelectorAll('.row-menu').forEach(m => m.style.display = 'none');

  updateHeaderCheckbox();
});

document.addEventListener('click', (e) => {
  const insideMenuOrBtn = e.target.closest('.row-menu') || e.target.closest('.menu-btn');
  if (insideMenuOrBtn) return;
  document.querySelectorAll('.row-menu').forEach(m => m.style.display = 'none');
});




