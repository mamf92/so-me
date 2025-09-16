import { Router } from './router/Router.ts';
import { routes } from './router/routes.ts';

// Get the element where content will be rendered
const contentElement = document.getElementById('main-content');

if (!contentElement) {
  throw new Error('Element with id "main-content" not found');
}

// Create an instance of our Router
const router = new Router(routes, contentElement);

// Handle initial page load
router.resolveRoute();

// Hijack link clicks
document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', (event) => {
    // Ensure the event has a target before accessing properties
    if (!(event.target instanceof Element)) return;

    event.preventDefault();
    const path =
      (event.target.closest('a') as HTMLAnchorElement)?.getAttribute('href') ||
      '/';
    router.navigate(path);
  });
});
