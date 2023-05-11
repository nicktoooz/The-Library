const sidebarToggle = document.getElementById('navigation-toggle');
const sidebarToggleExtend = document.getElementById('navigation-toggle-extend');

sidebarToggle.addEventListener('click', () => {
  console.log('CLicked');
  document.getElementById('sidebar--block').style.display = 'none';
  document.getElementById('sidebar--extend').style.display = 'flex';
});
sidebarToggleExtend.addEventListener('click', () => {
  document.getElementById('sidebar--block').style.display = 'flex';
  document.getElementById('sidebar--extend').style.display = 'none';
});
