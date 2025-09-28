/**
 * A simple client-side router for a SPA.
 * It maps URL paths to view-rendering functions and updates the content area.
 */
const BASE = import.meta.env.BASE_URL;

export type RouteResult = string | HTMLElement | null | undefined;
export type RouteHandler = () => RouteResult | Promise<RouteResult>;

export class Router {
  private routes: Record<string, RouteHandler>;
  private outlet: HTMLElement;
  private onRouteChange?: (path: string) => void;

  constructor(
    routes: Record<string, RouteHandler>,
    outlet: HTMLElement,
    onRouteChange?: (path: string) => void
  ) {
    this.routes = routes;
    this.outlet = outlet;
    this.onRouteChange = onRouteChange;
    window.addEventListener('popstate', () => this.resolveRoute());
  }

  navigate(path: string): void {
    const full = path.startsWith(BASE) ? path : BASE + path.replace(/^\/+/, '');
    history.pushState({}, '', full);
    this.resolveRoute();
  }

  resolveRoute(): void {
    const rawPath = window.location.pathname;
    const path = rawPath.startsWith(BASE)
      ? rawPath.slice(BASE.length - 1) || '/'
      : rawPath;
    this.onRouteChange?.(path);
    const view = this.routes[path] || this.notFoundView;
    try {
      const result = view();
      if (result instanceof Promise) {
        result
          .then((resolved) => this.render(resolved))
          .catch(() => this.render(this.errorView('Failed to load page.')));
      } else {
        this.render(result);
      }
    } catch {
      this.render(this.errorView('Unexpected error.'));
    }
  }

  private render(resolved: RouteResult): void {
    if (typeof resolved === 'string') {
      this.outlet.innerHTML = resolved;
    } else if (resolved instanceof HTMLElement) {
      this.outlet.innerHTML = '';
      this.outlet.appendChild(resolved);
    } else {
      this.outlet.innerHTML = '';
    }
  }

  private notFoundView(): string {
    return `
      <div class="text-center py-10">
        <h1 class="text-4xl font-bold color-darkgrey mb-4 font-heading">404</h1>
        <p class="text-xl color-grey font-heading">Page not found or under development</p>
        <a href="${BASE}" class="mt-6 inline-block text-blue-600 hover:underline font-body">
          Return to home page
        </a>
      </div>
    `;
  }

  private errorView(message: string): string {
    return `
      <div class="text-center py-10">
        <h1 class="text-2xl font-heading text-red-600 mb-4">Error</h1>
        <p class="font-body">${message}</p>
      </div>
    `;
  }
}
