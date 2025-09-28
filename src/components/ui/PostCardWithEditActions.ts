import type { Post } from '../../api/postsService';
import { LinkButton } from './Buttons';
import { Button } from './Buttons';
import { requestConfirmation } from './Popups';
import { deletePost } from '../../api/postsService';
const BASE = import.meta.env.BASE_URL;

/**
 * Creates the edit post form by displaying the post as values in the form.
 * @param post - The post in which the user wants to edit
 * @returns - The HTML string for the edit post form.
 */

export function renderPostCardWithEditActions(post: Post): HTMLElement {
  if (!post) {
    return document.createElement('div');
  }
  const postCard = document.createElement('article');
  postCard.className =
    'post-card flex flex-col w-[calc(100vw-2rem)] max-w-[42.5rem] gap-2';

  const postContent = document.createElement('div');
  postContent.className =
    'flex flex-col sm:items-center sm:flex-row rounded-2xl overflow-hidden border-8 border-black';
  const mediaContainer = document.createElement('div');
  mediaContainer.className =
    'flex justify-center sm:max-w-[calc(20%-1rem)] shrink-0';
  if (post.media) {
    const img = document.createElement('img');
    img.src = post.media.url;
    img.alt = post.media.alt || '';
    img.className = 'flex h-full object-cover';
    mediaContainer.appendChild(img);
  }
  postContent.appendChild(mediaContainer);

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
  title.className = 'font-extrabold text-sm text-left';
  title.textContent = post.title;
  content.appendChild(title);

  const body = document.createElement('p');
  body.className = 'font-body text-xs';
  body.textContent = post.body;
  content.appendChild(body);

  const tagsContainer = document.createElement('div');
  tagsContainer.className = 'flex flex-row gap-4 items-center';
  const tagsList = document.createElement('div');
  tagsList.className = 'flex flex-row text-xs text-black underline gap-2';
  if (Array.isArray(post.tags)) {
    post.tags.forEach((tag) => {
      const tagElement = document.createElement('span');
      tagElement.textContent = `#${tag}`;
      tagsList.appendChild(tagElement);
    });
  }
  tagsContainer.appendChild(tagsList);
  content.appendChild(tagsContainer);
  postContent.appendChild(content);
  postCard.appendChild(postContent);

  const actionsContainer = document.createElement('div');
  actionsContainer.className =
    'flex flex-row w-[calc(100vw-2rem)] rounded-2xl border-8 border-black max-w-[42.5rem] x-8 py-2';
  const actions = document.createElement('div');
  actions.className = 'flex flex-row w-full justify-center gap-8';

  const editButton = LinkButton({
    label: 'Edit',
    size: 'xsmall',
    href: `${BASE}edit?id=${post.id}`,
  });
  actions.appendChild(editButton);

  const viewButton = LinkButton({
    label: 'View',
    size: 'xsmall',
    href: `${BASE}post?id=${post.id}`,
  });
  actions.appendChild(viewButton);

  const deleteButton = Button({
    label: 'Delete',
    size: 'xsmall',
    onClick: () => {
      requestConfirmation({
        title: 'Delete Post',
        message:
          'Are you sure you want to delete this post? This action cannot be undone.',
        icon: 'warning',
        confirmationLabel: 'Delete',
        cancellationLabel: 'Cancel',
      }).then(async (confirmed) => {
        if (confirmed) {
          try {
            await deletePost(post.id);
            postCard.remove();
          } catch (error) {
            alert('Failed to delete the post. Please try again.');
          }
        }
      });
    },
  });
  actions.appendChild(deleteButton);

  actionsContainer.appendChild(actions);
  postCard.appendChild(actionsContainer);

  return postCard;
}
