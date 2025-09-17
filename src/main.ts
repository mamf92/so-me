import { Router } from './router/Router';
import { routes } from './router/routes';
import { Header } from './components/layout/Header';

/**
 * Main application initialization.
 * Sets up the header and the router for handling navigation.
 */

export function App() {
  // Get the elements from your HTML
  const headerContainer = document.getElementById('header-container');
  const mainContent = document.getElementById('main-container');
  // Ensure the elements exist
  if (!headerContainer || !mainContent) {
    throw new Error('Required DOM elements not found');
  }
  // Render the header
  headerContainer.innerHTML = '';
  headerContainer.appendChild(Header());

  // Initialize the router with the main content area
  const router = new Router(routes, mainContent);

  // Set up navigation event listeners for links
  setupNavigation(router);

  // Initial route resolution
  router.resolveRoute();
}

/**
 * Sets up navigation event listeners for the application.
 * @param router The Router instance to handle navigation
 */

function setupNavigation(router: Router) {
  // Handle navigation clicks
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a[href]') as HTMLAnchorElement;
    // Only handle internal links
    if (link && link.href.startsWith(window.location.origin)) {
      event.preventDefault();
      const path = new URL(link.href).pathname;
      router.navigate(path);
    }
  });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', App);
