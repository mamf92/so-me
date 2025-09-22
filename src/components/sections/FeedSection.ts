import type { Post } from '../../api/postsService';
import { renderPostCardWithEditActions } from '../ui/PostCardWithEditActions';
import { requestConfirmation } from '../ui/Popups';
import { LinkButton } from '../ui/Buttons';
import { Button } from '../ui/Buttons';

export function renderFeedSection(posts: Post[]) {
  const feedContainer = document.createElement('div');
  feedContainer.innerHTML = '';
  feedContainer.className = 'flex flex-col gap-4 justify-center align-center';
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
    try {
      const confirmed = requestConfirmation({
        title: 'You have no posts yet.',
        message: 'Create your first post now!',
        confirmationLabel: 'Create post',
        cancellationLabel: 'Later',
        icon: 'warning',
      });
      if (!confirmed) {
        const noPostsMessage = document.createElement('div');
        noPostsMessage.className =
          'flex flex-row justify-center items-center w-full';
        noPostsMessage.textContent = 'You have not created any posts yet.';
        const createPostLink = LinkButton({
          label: 'Create Post',
          href: '/create-post',
          size: 'large',
          fill: false,
        });
        feedContainer.appendChild(noPostsMessage);
        feedContainer.appendChild(createPostLink);
      } else {
        window.location.href = '/create-post';
      }
    } catch (error) {
      console.error('Error displaying confirmation popup:', error);
    }
  }

  posts.forEach((post) => {
    const postCard = renderPostCardWithEditActions(post);
    feedContainer.insertAdjacentHTML('beforeend', postCard);
  });

  return feedContainer;
}
