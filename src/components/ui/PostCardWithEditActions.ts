import type { Post } from '../../api/postsService';
import { LinkButton } from './Buttons';
import { Button } from './Buttons';

/**
 * Creates the edit post form by displaying the post as values in the form.
 * @param post - The post in which the user wants to edit
 * @returns - The HTML string for the edit post form.
 */

export function renderPostCardWithEditActions(post: Post): string {
  if (!post) {
    return '';
  }

  return `
    <article
      class="post-card flex flex-col w-[calc(100vw-2rem)] max-w-[42.5rem] gap-2"
      data-id="${post.id}"
    >
      <div class="flex flex-col sm:items-center sm:flex-row rounded-2xl overflow-hidden border-8 border-black">
        <div class="flex sm:max-w-[calc(20%-1rem)] shrink-0">
          ${
            post.media
              ? `<img
            src="${post.media.url}"
            alt="${post.media.alt || post.title}"
            class="flex h-full object-cover"
          />`
              : ''
          }
        </div>
        <div class="flex flex-col w-full gap-2 px-2 py-1 justify-center">
          <div class="flex flex-row w-full justify-between">
            <span class="font-body text-xs">${post.author?.name || 'Unknown Profile'}</span>
            <div class="flex flex-row gap-2 items-center">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor" class="h-4 w-4 text-black">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </span>
              <span class="font-body text-xs">
                ${new Date(post.updated).toLocaleDateString([], { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' })}
              </span>
              <span class="font-body text-xs">
                ${new Date(post.updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
          <h3 class="font-extrabold text-sm text-left">${post.title}</h3>
          <p class="font-body text-xs">${post.body}</p>
          <div class="flex flex-row gap-4 items-center">
            <div class="flex flex-row text-xs text-black underline gap-2">
              ${Array.isArray(post.tags) ? post.tags.map((tag) => `<span>#${tag}</span>`).join('') : ''}
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row w-[calc(100vw-2rem)] rounded-2xl border-8 border-black max-w-[42.5rem] x-8 py-2">
        <div class="flex flex-row w-full justify-center gap-8">
          ${
            LinkButton({
              label: 'Edit',
              size: 'xsmall',
              href: `/edit?id=${post.id}`,
            }).outerHTML
          }
          ${
            LinkButton({
              label: 'View',
              size: 'xsmall',
              href: `/post?id=${post.id}`,
            }).outerHTML
          }
          ${
            Button({
              label: 'Delete',
              size: 'xsmall',
            }).outerHTML
          }
        </div>
      </div>
    </article>
  `;
}
