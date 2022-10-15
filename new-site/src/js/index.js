/* eslint-disable prettier/prettier */

const moreBtn = document.getElementById('more');
const hiddenBtn = document.getElementById('hidden');
const list = document.getElementById('show');
const layout = document.getElementById('layout');

moreBtn.addEventListener('click', () => {
  list.style.overflow = 'visible';
  moreBtn.style.display = 'none';
  layout.classList.add('hidden');
});

hiddenBtn.addEventListener('click', () => {
  list.style.overflow = 'hidden';
  moreBtn.style.display = 'block';
  layout.classList.remove('hidden');
});
