import type { Post } from '../../api/postsService';
import { renderPostCard } from '../ui/PostCard';
import { requestConfirmation } from '../ui/Popups';
import { Button } from '../ui/Buttons';

type CurrentFeed = 'newest' | 'following';

export interface FeedSectionProps {
  posts: Post[];
  currentPage: CurrentFeed;
}

export function renderFeedSection({
  posts,
  currentPage,
}: FeedSectionProps): HTMLElement {
  const feedContainer = document.createElement('section');
  feedContainer.innerHTML = '';
  feedContainer.className =
    'flex flex-col w-full gap-4 justify-center items-center max-w-[calc(100%-2rem)] lg:max-w-[42.5rem]';
  const feedActions = document.createElement('div');
  feedActions.className = 'flex flex-row justify-between items-center w-full';
  feedActions.appendChild(
    Button({
      label: 'Newest',
      size: 'medium',
      fill: currentPage === 'newest',
      onClick: () => {
        window.location.href = '/';
        console.log('Show Newest');
      },
    })
  );
  feedActions.appendChild(
    Button({
      label: 'Following',
      size: 'medium',
      fill: currentPage === 'following',
      onClick: () => {
        window.location.href = '/followingfeed';
        console.log('Show Following');
      },
    })
  );
  feedActions.appendChild(
    Button({
      label: 'Create',
      size: 'medium',
      fill: false,
      onClick: () => {
        window.location.href = '/create';
        console.log('');
      },
    })
  );
  feedContainer.appendChild(feedActions);

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
    const emptyFeedMessage = document.createElement('img');
    const gifUrl = new URL('../../assets/gifs/mac-looking.gif', import.meta.url)
      .href;
    emptyFeedMessage.src = gifUrl;
    emptyFeedMessage.alt = 'No posts';
    emptyFeedMessage.className = 'w-auto h-48 mb-4';
    feedContainer.appendChild(emptyFeedMessage);
    return feedContainer;
  }

  posts.forEach((post) => {
    const postCard = renderPostCard(post);
    postCard.addEventListener('click', () => {
      window.location.href = `/post?id=${post.id}`;
    });
    feedContainer.appendChild(postCard);
  });

  return feedContainer;
}
