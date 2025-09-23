import type { Post } from '../../api/postsService';

export function renderPostCard(post: Post) {
  if (!post) {
    return '';
  }

  return `
    <article
      class='post-card flex flex-col justify-center items-center lg:flex-row w-full lg:max-h-[10rem] rounded-2xl border-8 border-black overflow-hidden'
      data-id='${post.id}'>
       <div class="flex lg:h-40 lg:w-[calc(20%-1rem)] shrink-0 overflow-hidden">
       ${
         post.media
           ? `
          <img src="${post.media.url}"
            alt="${post.media.alt || post.title}"
            class="lg:h-full lg:w-full object-cover"
          />`
           : ''
       }
        </div>
      <div class='flex flex-col w-full gap-2 px-2 py-1 justify-center'>
        <div class='flex flex-row w-full justify-between'>
          <span class='font-body text-xs'>${post.author?.name || 'Unknown Profile'}</span>
          <div class='flex flex-row gap-2 items-center'>
            <span>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2.2' stroke='currentColor' class='h-4 w-4 text-black'>
                <path stroke-linecap='round' stroke-linejoin='round' d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
              </svg>
            </span>
            <span class='font-body text-xs'>
              ${new Date(post.updated).toLocaleDateString([], { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' })}
            </span>
            <span class='font-body text-xs'> ${new Date(post.updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} </span>
          </div>
        </div>
        <h3 class='font-heading font-extrabold text-sm text-left'>${post.title}</h3>
        <p class='font-body text-xs'>${post.body}</p>
        <div class='flex flex-row gap-4 items-center'>
          <div class='flex flex-row text-sm text-black underline gap-2'>
            ${Array.isArray(post.tags) ? post.tags.map((tag) => `<span>#${tag}</span>`).join('') : ''}
          </div>
        </div>
      </div>
    </article>
  `;
}
