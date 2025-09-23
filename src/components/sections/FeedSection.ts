import type { Post } from '../../api/postsService';
import { renderPostCard } from '../ui/PostCard';
import { showPopup } from '../ui/Popups';
import { Button } from '../ui/Buttons';

export function renderFeedSection(posts: Post[]): HTMLDivElement {
  const feedContainer = document.createElement('div');
  feedContainer.innerHTML = '';
  feedContainer.className =
    'flex flex-col w-full gap-4 justify-center items-center max-w-[calc(100%-2rem)] lg:max-w-[42.5rem]';
  const feedActions = document.createElement('div');
  feedActions.className = 'flex flex-row justify-between items-center w-full';
  feedActions.appendChild(
    Button({
      label: 'Newest',
      size: 'medium',
      fill: true,
      onClick: () => {
        // Implement sorting logic here
        console.log('Sort by Newest');
      },
    })
  );
  feedActions.appendChild(
    Button({
      label: 'Popular',
      size: 'medium',
      fill: false,
      onClick: () => {
        // Implement sorting logic here
        console.log('Sort by Most popular');
      },
    })
  );
  feedActions.appendChild(
    Button({
      label: 'Create',
      size: 'medium',
      fill: false,
      onClick: () => {
        // Implement sorting logic here
        console.log('');
      },
    })
  );
  feedContainer.appendChild(feedActions);

  if (posts.length === 0) {
    showPopup({
      title: 'No post created yet',
      message: 'Be the first one to create a post!',
      icon: 'warning',
    });
  }

  posts.forEach((post) => {
    const postCard = renderPostCard(post);
    feedContainer.insertAdjacentHTML('beforeend', postCard);
  });

  return feedContainer;
}
