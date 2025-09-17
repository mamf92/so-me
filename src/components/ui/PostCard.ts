import type { Post } from '../../api/postsService';

interface Props {
  post: Post;
}

export function PostCard(props: Props) {
  // We pass the entire post object as a prop for convenience
  const { post } = props;

  // It's good practice to handle cases where data might be missing
  if (!post) {
    return '';
  }

  return `
    <article
      class='post-card max-h-[10rem] rounded-sm outline-8 outline-black flex flex-row'
      data-id='${post.id}'
    >
      <img
        src='${post.media.url}'
        alt='${post.media.alt || post.title}'
        class='h-auto w-[10rem] object-cover'
      />
      <div class='flex flex-col w-full gap-2 px-2 justify-center'>
        <div class='flex flex-row w-full justify-between'>
          <span class='font-body'>${post.author?.name || 'Unknown Profile'}</span>
          <div class='flex flex-row gap-2 items-center'>
            <span>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2.2' stroke='currentColor' class='h-4 w-4 text-black'>
                <path stroke-linecap='round' stroke-linejoin='round' d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
              </svg>
            </span>
            <span class='font-body'>
              ${new Date(post.updated).toLocaleDateString([], { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' })}
            </span>
            <span class='font-body'> ${new Date(post.updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} </span>
          </div>
        </div>
        <h3 class='font-extrabold text-2xl text-left'>${post.title}</h3>
        <p>${post.body}</p>
        <div class='flex flex-row gap-4 items-center'>
          <div class='flex flex-row text-sm text-black underline gap-2'>
            ${Array.isArray(post.tags) ? post.tags.map((tag) => `<span>#${tag}</span>`).join('') : ''}
          </div>
        </div>
      </div>
    </article>
  `;
}
