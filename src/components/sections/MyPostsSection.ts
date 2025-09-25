import type { Post } from '../../api/postsService';
import { requestConfirmation } from '../ui/Popups';
import { LinkButton, Button } from '../ui/Buttons';
import { renderPostCard } from '../ui/PostCard';
import { renderPostCardWithEditActions } from '../ui/PostCardWithEditActions';

export type CurrentFeed = 'newest' | 'following';

interface MyPostsSectionProps {
  posts: Post[];
  currentPage: CurrentFeed;
  onChangeFeed: (feed: CurrentFeed) => void;
}

export function renderMyPostsSection({
  posts,
  currentPage,
  onChangeFeed,
}: MyPostsSectionProps): HTMLElement {
  const myPostsContainer = document.createElement('div');
  myPostsContainer.innerHTML = '';
  myPostsContainer.className =
    'flex flex-col gap-4 justify-center align-center';
  const myPostsActions = document.createElement('div');
  myPostsActions.className =
    'flex flex-row justify-between gap-4 items-center w-full';
  myPostsActions.appendChild(
    Button({
      label: 'Newest',
      size: 'medium',
      fill: currentPage === 'newest',
      onClick: () => {
        onChangeFeed('newest');
      },
    })
  );
  myPostsActions.appendChild(
    Button({
      label: 'Following',
      size: 'medium',
      fill: currentPage === 'following',
      onClick: () => {
        onChangeFeed('following');
      },
    })
  );

  myPostsActions.appendChild(
    Button({
      label: 'Create',
      size: 'medium',
      fill: false,
      onClick: () => {
        window.location.href = '/create';
      },
    })
  );
  myPostsContainer.appendChild(myPostsActions);

  if (posts.length === 0 && currentPage === 'newest') {
    requestConfirmation({
      title: 'You have no posts yet.',
      message: 'Create your first post now!',
      icon: 'warning',
      confirmationLabel: 'Create post',
      cancellationLabel: 'Later',
    }).then((confirmed) => {
      if (confirmed) {
        window.location.href = '/create';
      }
    });
    const noPostsMessage = document.createElement('div');
    noPostsMessage.className =
      'flex flex-col justify-center items-center w-full min-w-[20rem]';
    noPostsMessage.textContent = 'You have not created any posts yet.';
    const noPostsImage = document.createElement('img');
    const gifUrl = new URL(
      '../../assets/gifs/bird-looking.gif',
      import.meta.url
    ).href;
    noPostsImage.src = gifUrl;
    noPostsImage.alt = 'No posts';
    noPostsImage.className = 'w-auto h-48 mb-4';
    noPostsMessage.appendChild(noPostsImage);
    const createPostLink = LinkButton({
      label: 'Create Post',
      href: '/create',
      size: 'large',
      fill: false,
    });
    myPostsContainer.appendChild(noPostsMessage);
    myPostsContainer.appendChild(createPostLink);
    return myPostsContainer;
  }

  if (posts.length === 0 && currentPage === 'following') {
    requestConfirmation({
      title: 'No post from followed users.',
      message: 'Go explore and follow some users!',
      icon: 'warning',
      confirmationLabel: 'Explore',
      cancellationLabel: 'Later',
    }).then((confirmed) => {
      if (confirmed) {
        window.location.href = '/explore';
      }
    });
    const noPostsImage = document.createElement('img');
    const gifUrl = new URL('../../assets/gifs/mac-looking.gif', import.meta.url)
      .href;
    noPostsImage.src = gifUrl;
    noPostsImage.alt = 'No posts';
    noPostsImage.className = 'w-auto h-48 mb-4';
    myPostsContainer.appendChild(noPostsImage);
    return myPostsContainer;
  }
  if (currentPage === 'newest') {
    posts.forEach((post) => {
      const postCard = renderPostCardWithEditActions(post);
      myPostsContainer.appendChild(postCard);
    });
  }
  if (currentPage === 'following' && posts.length > 0) {
    posts.forEach((post) => {
      const postCard = renderPostCard(post);
      myPostsContainer.appendChild(postCard);
    });
    return myPostsContainer;
  }
  return myPostsContainer;
}
