/**
 * A simple client-side router for a SPA.
 * It maps URL paths to view-rendering functions and updates the content area.
 */

export class Router {
  private routes: Record<string, () => string | HTMLElement>;
  private contentElement: HTMLElement;

  // Initialize with route mappings and the target content element
  constructor(
    routes: Record<string, () => string | HTMLElement>,
    contentElement: HTMLElement
  ) {
    this.routes = routes;
    this.contentElement = contentElement;

    // Listen for back/forward navigation
    window.addEventListener('popstate', () => this.resolveRoute());
  }

  // Called when a user clicks a link
  navigate(path: string): void {
    history.pushState({}, '', path);
    this.resolveRoute();
  }

  // Find the correct view and render it
  resolveRoute(): void {
    const path = window.location.pathname;
    // Find the view function for the current path, or use the 404 view
    const view = this.routes[path] || this.notFoundView;

    // Render the view's content into our target element
    const result = view();

    if (typeof result === 'string') {
      this.contentElement.innerHTML = result;
    } else if (result instanceof HTMLElement) {
      this.contentElement.innerHTML = '';
      this.contentElement.appendChild(result);
    } else {
      this.contentElement.innerHTML = '';
    }
  }

  private notFoundView(): string {
    return `
      <div class="text-center py-10">
        <h1 class="text-4xl font-bold color-darkgrey mb-4 font-heading">404</h1>
        <p class="text-xl color-grey font-heading">Page not found or under development</p>
        <a href="/" class="mt-6 inline-block text-blue-600 hover:underline font-body">
          Return to home page
        </a>
      </div>
    `;
  }
}
