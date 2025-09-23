export function showPageSpinner(parent?: HTMLElement) {
  const spinner = document.createElement('div');
  spinner.className =
    'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-white bg-opacity-75 z-50';
  spinner.id = 'loader-container';
  spinner.innerHTML = '<div id="loader" class="loader"></div>';
  (parent ?? document.body).appendChild(spinner);
  return spinner;
}

export function hidePageSpinner() {
  const spinner = document.getElementById('loader');
  if (spinner) {
    console.log('Hiding spinner');
    spinner.classList.remove('loader');
    spinner.parentElement?.remove();
  } else {
    console.log('No spinner found to hide');
  }
}
