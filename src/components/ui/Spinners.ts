export function showPageSpinner(parent?: HTMLElement) {
  const spinner = document.createElement('div');
  spinner.id = 'loader-container';
  spinner.innerHTML = '<div id="loader" class="loader"></div>';
  (parent ?? document.body).appendChild(spinner);
  return spinner;
}

export function hidePageSpinner() {
  const spinner = document.getElementById('loader');
  if (spinner) {
    spinner.removeAttribute('class');
    spinner.parentElement?.remove();
  }
}
