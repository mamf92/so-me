import type { Post } from '../../api/postsService';

export function renderPostCard(post: Post): HTMLElement {
  if (!post) {
    return document.createElement('div');
  }
  const postCard = document.createElement('article');
  postCard.className =
    'post-card flex flex-col justify-center items-center lg:flex-row w-full lg:max-h-[10rem] rounded-2xl border-8 border-black overflow-hidden';
  const media = document.createElement('div');
  media.className =
    'flex lg:h-40 lg:w-[calc(20%-1rem)] shrink-0 overflow-hidden';
  if (post.media) {
    const img = document.createElement('img');
    img.src = post.media.url;
    img.alt = post.media.alt || post.title;
    img.className = 'lg:h-full lg:w-full object-cover';
    media.appendChild(img);
  }
  postCard.appendChild(media);

  const content = document.createElement('div');
  content.className = 'flex flex-col w-full gap-2 px-2 py-1 justify-center';

  const header = document.createElement('div');
  header.className = 'flex flex-row w-full justify-between';

  const author = document.createElement('span');
  author.className = 'font-body text-xs';
  author.textContent = post.author?.name || 'Unknown Profile';
  header.appendChild(author);

  const meta = document.createElement('div');
  meta.className = 'flex flex-row gap-2 items-center';

  const clockIcon = document.createElement('span');
  clockIcon.innerHTML = `
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2.2' stroke='currentColor' class='h-4 w-4 text-black'>
      <path stroke-linecap='round' stroke-linejoin='round' d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
    </svg>
  `;
  meta.appendChild(clockIcon);

  const date = document.createElement('span');
  date.className = 'font-body text-xs';
  date.textContent = new Date(post.updated).toLocaleDateString([], {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  meta.appendChild(date);

  const time = document.createElement('span');
  time.className = 'font-body text-xs';
  time.textContent = new Date(post.updated).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  meta.appendChild(time);

  header.appendChild(meta);
  content.appendChild(header);

  const title = document.createElement('h3');
  title.className = 'font-heading font-extrabold text-sm text-left';
  title.textContent = post.title;
  content.appendChild(title);

  const body = document.createElement('p');
  body.className = 'font-body text-xs';
  body.textContent = post.body;
  content.appendChild(body);

  const footer = document.createElement('div');
  footer.className = 'flex flex-row gap-4 items-center';

  const tagsContainer = document.createElement('div');
  tagsContainer.className = 'flex flex-row text-sm text-black underline gap-2';
  if (Array.isArray(post.tags)) {
    post.tags.forEach((tag) => {
      const tagSpan = document.createElement('span');
      tagSpan.textContent = `#${tag}`;
      tagsContainer.appendChild(tagSpan);
    });
  }
  footer.appendChild(tagsContainer);
  content.appendChild(footer);
  postCard.appendChild(content);

  return postCard;
}
