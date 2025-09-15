import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="fun-container">
    <h1>🎨 Random Color Fun!</h1>
    <p>Click the button to change the background color!</p>
    <button id="color-btn" type="button">Change Color</button>
    <p class="read-the-docs">
      Built with Vite + TypeScript
    </p>
  </div>
`;

// New fun function to change background color
const changeColor = () => {
  const colors = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#F033FF',
    '#FF33A1',
    '#33FFF5',
  ];
  document.body.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];
};

document
  .querySelector<HTMLButtonElement>('#color-btn')!
  .addEventListener('click', changeColor);
