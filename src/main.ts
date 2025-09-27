import { Router } from './router/Router';
import { routes } from './router/routes';
import { Header } from './components/layout/Header';
import type { HeaderProps } from './components/layout/Header';

/**
 * Main application initialization.
 * Sets up the header and the router for handling navigation.
 */

export function App() {
  // Get target elements from HTML
  const headerContainer = document.getElementById('header-container');
  const mainContent = document.getElementById('main-container');
  // Ensure the elements exist
  if (!headerContainer || !mainContent) {
    throw new Error('Required DOM elements not found');
  }

  const currentPage = checkCurrentPage(window.location.pathname);

  // Render the header
  headerContainer.innerHTML = '';
  headerContainer.appendChild(Header(currentPage));

  // Initialize the router with the main content area
  const router = new Router(routes, mainContent, (path) => {
    const newPage = checkCurrentPage(path);
    headerContainer.innerHTML = '';
    headerContainer.appendChild(Header(newPage));
  });

  // Set up navigation event listeners for links
  setupNavigation(router);

  // Initial route resolution
  router.resolveRoute();
}

function checkCurrentPage(pathname: string): HeaderProps {
  switch (pathname) {
    case '/':
      return 'feed';
    case '/myprofile':
      return 'profile';
    case '/explore':
      return 'explore';
    default:
      return null;
  }
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
      const url = new URL(link.href);
      const pathWithSearch = url.pathname + url.search;
      router.navigate(pathWithSearch);
    }
  });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', App);
