function readUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}
function writeUsers(arr) {
  localStorage.setItem('users', JSON.stringify(arr));
}

function collectUsersFromDOM() {
  const rows = document.querySelectorAll('.client-row');
  const arr = [];
  rows.forEach(r => {
    arr.push({
      name: r.querySelector('.client-row__fullname')?.textContent.trim() || '',
      email: r.querySelector('.client-row__email')?.textContent.trim() || '',
      company: r.querySelector('.client-row__company')?.textContent.trim() || '',
      phone: r.querySelector('.client-row__phone')?.textContent.trim() || '',
      status: r.querySelector('.status-badge')?.textContent.trim() || '',
      date: r.querySelector('.client-row__date')?.textContent.trim() || '',
    });
  });
  return arr;
}

function renderUsersIntoDOM(users) {
  const rows = document.querySelectorAll('.client-row');
  rows.forEach((r, i) => {
    r.dataset.index = i;
    const u = users[i];
    if (!u) return;

    const setText = (sel, val) => { const el = r.querySelector(sel); if (el) el.textContent = val; };
    setText('.client-row__fullname', u.name);
    setText('.client-row__email',   u.email);
    setText('.client-row__company', u.company);
    setText('.client-row__phone',   u.phone);
    setText('.client-row__date',    u.date);

    const st = r.querySelector('.status-badge');
    if (st) {
      const statusText = (u.status === 'Неактивен') ? 'Неактивен' : 'Активен';
      st.textContent = statusText;
      st.classList.remove('status-badge--active', 'status-badge--nonactive');
      if (statusText === 'Активен') {
        st.classList.add('status-badge--active');
      } else {
        st.classList.add('status-badge--nonactive');
      }
    }
  });
}


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
  const rows = document.querySelectorAll('.client-row');
  const allSelected = [...rows].every(r => r.classList.contains('client-row--selected'));
  rows.forEach(r => r.classList.toggle('client-row--selected', !allSelected));
  updateHeaderCheckbox();
}

function updateHeaderCheckbox() {
  const header = document.querySelector('.columns__checkbox');
  if (!header) return;
  const rows = document.querySelectorAll('.client-row');
  const selectedCount = document.querySelectorAll('.client-row.client-row--selected').length;
  if (rows.length && selectedCount === rows.length) {
    header.classList.add('columns__checkbox--selected');
  } else {
    header.classList.remove('columns__checkbox--selected');
  }
}

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

document.addEventListener('DOMContentLoaded', () => {
  let users = readUsers();
  if (users.length === 0) {
    users = collectUsersFromDOM();
    writeUsers(users);
  }
  renderUsersIntoDOM(users);
  document.querySelectorAll('.client-row').forEach((row, i) => row.dataset.index = i);

  document.querySelector('.panel').addEventListener('click', (e) => {
    const checkbox = e.target.closest('.client-row__checkbox');
    if (checkbox) toggleRow.call(checkbox, e);
  });

  document.querySelectorAll('.client-row').forEach((row, i) => {
    const editBtn = row.querySelector('.row-menu__btn1');
    if (!editBtn) return;
    editBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      localStorage.setItem('editIndex', String(i));
      window.location.href = 'pages/edit.html';
    });
  });

  document.addEventListener('click', (e) => {
    const delBtn = e.target.closest('.row-menu__btn2');
    if (!delBtn) return;

    const row = delBtn.closest('.client-row');
    if (!row) return;
    const idx = Number(row.dataset.index);

    row.remove();
    document.querySelectorAll('.row-menu').forEach(m => m.style.display = 'none');

    users = readUsers().filter((_, i) => i !== idx);
    writeUsers(users);

    document.querySelectorAll('.client-row').forEach((r, i) => r.dataset.index = i);
    updateHeaderCheckbox();
  });

  document.addEventListener('click', (e) => {
    const inside = e.target.closest('.row-menu') || e.target.closest('.menu-btn');
    if (!inside) document.querySelectorAll('.row-menu').forEach(m => m.style.display = 'none');
  });
});
