import type { SinglePostResponse } from '../../api/postsService';

export function renderPost(post: SinglePostResponse): HTMLElement {
  if (!post) {
    const emptyState = document.createElement('div');
    emptyState.textContent = 'Post not found.';
    const emptyFeedMessage = document.createElement('img');
    const gifUrl = new URL('../../assets/gifs/mac-looking.gif', import.meta.url)
      .href;
    emptyFeedMessage.src = gifUrl;
    emptyFeedMessage.alt = 'No posts';
    emptyFeedMessage.className = 'w-auto h-48 mb-4';
    emptyState.appendChild(emptyFeedMessage);
    return emptyState;
  }

  const article = document.createElement('article');
  article.className =
    'flex flex-col rounded-2xl border-8 lg:border-16 border-black w-[calc(100vw-2rem)] max-w-[42.5rem]';

  if (post.data.media && post.data.media.url) {
    const media = document.createElement('div');
    media.className = 'flex flex-row max-h-[20rem]';
    const img = document.createElement('img');
    img.src = post.data.media.url;
    img.alt = post.data.media.alt || post.data.title;
    img.className = 'w-full h-auto object-cover';
    media.appendChild(img);
    article.appendChild(media);
  }

  const content = document.createElement('div');
  content.className = 'flex flex-col w-full gap-2 p-2 justify-center';
  article.appendChild(content);

  const header = document.createElement('div');
  header.className = 'flex flex-row w-full justify-between';
  content.appendChild(header);

  const authorSpan = document.createElement('span');
  authorSpan.className = 'font-body text-xs';
  authorSpan.textContent = post.data.author?.name || 'Unknown Profile';
  header.appendChild(authorSpan);

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
  date.className = 'font-body';
  date.textContent = new Date(post.data.updated).toLocaleDateString([], {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  meta.appendChild(date);

  const time = document.createElement('span');
  time.className = 'font-body text-xs';
  time.textContent = new Date(post.data.updated).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  meta.appendChild(time);
  header.appendChild(meta);

  const title = document.createElement('h3');
  title.className = 'font-heading font-extrabold text-2xl lg:text-4xl';
  title.textContent = post.data.title;
  content.appendChild(title);

  const body = document.createElement('p');
  body.className = 'font-body text-sm';
  body.textContent = post.data.body;
  content.appendChild(body);

  if (Array.isArray(post.data.tags) && post.data.tags.length > 0) {
    const tags = document.createElement('div');
    tags.className = 'flex flex-row gap-4 items-center';
    const tagsList = document.createElement('div');
    tagsList.className = 'flex flex-row text-sm text-black underline gap-2';
    post.data.tags.forEach((tag) => {
      const tagElement = document.createElement('span');
      tagElement.textContent = `#${tag}`;
      tagsList.appendChild(tagElement);
    });
    tags.appendChild(tagsList);
    content.appendChild(tags);
  }
  return article;
}
