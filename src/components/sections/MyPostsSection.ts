import type { Post } from '../../api/postsService';
import { renderPostCardWithEditActions } from '../ui/PostCardWithEditActions';
import { requestConfirmation } from '../ui/Popups';
import { LinkButton } from '../ui/Buttons';
import { Button } from '../ui/Buttons';

export function renderMyPostsSection(posts: Post[]) {
  const myPostsContainer = document.createElement('div');
  myPostsContainer.innerHTML = '';
  myPostsContainer.className =
    'flex flex-col gap-4 justify-center align-center';
  const myPostsActions = document.createElement('div');
  myPostsActions.className =
    'flex flex-row justify-between items-center w-full';
  myPostsActions.appendChild(
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
  myPostsActions.appendChild(
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
  myPostsActions.appendChild(
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
  myPostsContainer.appendChild(myPostsActions);

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
        myPostsContainer.appendChild(noPostsMessage);
        myPostsContainer.appendChild(createPostLink);
      } else {
        window.location.href = '/create-post';
      }
    } catch (error) {
      console.error('Error displaying confirmation popup:', error);
    }
  }

  posts.forEach((post) => {
    const postCard = renderPostCardWithEditActions(post);
    myPostsContainer.insertAdjacentHTML('beforeend', postCard);
  });

  return myPostsContainer;
}
