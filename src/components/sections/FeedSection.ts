import type { Post } from '../../api/postsService';
import { renderPostCard } from '../ui/PostCard';
import { requestConfirmation } from '../ui/Popups';
import { Button } from '../ui/Buttons';

type CurrentFeed = 'newest' | 'following';

export interface FeedSectionProps {
  posts: Post[];
  currentPage: CurrentFeed;
  followingNames: Set<string>;
}

export function renderFeedSection({
  posts,
  currentPage,
  followingNames,
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

  const followingSet = followingNames || new Set<string>();

  posts.forEach((post) => {
    const authorName = post.author?.name || '';
    const isFollowing = authorName !== '' && followingSet.has(authorName);
    const postCard = renderPostCard(post, isFollowing);
    feedContainer.appendChild(postCard);
  });

  return feedContainer;
}
