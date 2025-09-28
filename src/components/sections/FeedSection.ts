import type { Post } from '../../api/postsService';
import { getPosts, getPostsFromFollowedUsers } from '../../api/postsService';
import { renderPostCard } from '../ui/PostCard';
import { requestConfirmation } from '../ui/Popups';
import { Button } from '../ui/Buttons';
const BASE = import.meta.env.BASE_URL;

type CurrentFeed = 'newest' | 'following';

export interface FeedSectionProps {
  posts: Post[];
  currentPage: CurrentFeed;
  followingNames: Set<string>;
  initialPage?: number;
  limit?: number;
}

export function renderFeedSection({
  posts,
  currentPage,
  followingNames,
  initialPage = 1,
  limit = 10,
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
        window.location.href = BASE;
      },
    })
  );
  feedActions.appendChild(
    Button({
      label: 'Following',
      size: 'medium',
      fill: currentPage === 'following',
      onClick: () => {
        window.location.href = BASE + 'followingfeed';
      },
    })
  );
  feedActions.appendChild(
    Button({
      label: 'Create',
      size: 'medium',
      fill: false,
      onClick: () => {
        window.location.href = BASE + 'create';
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
        window.location.href = BASE + 'explore';
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

  // Wrapper for post cards
  const postsWrapper = document.createElement('div');
  postsWrapper.className = 'flex flex-col w-full gap-4';
  feedContainer.appendChild(postsWrapper);

  // Render initial posts
  function appendPosts(list: Post[]) {
    list.forEach((post) => {
      const authorName = post.author?.name || '';
      const isFollowing = authorName !== '' && followingSet.has(authorName);
      const postCard = renderPostCard(post, isFollowing);
      postCard.addEventListener('click', () => {
        window.location.href = BASE + `post?id=${post.id}`;
      });
      postsWrapper.appendChild(postCard);
    });
  }
  appendPosts(posts);

  // Pagination state
  let currentPageNumber = initialPage;
  let isLoading = false;

  // Load More button if there are potentially more posts
  if (posts.length === limit) {
    const loadMoreButton = Button({
      label: 'Load more',
      size: 'medium',
      fill: false,
      onClick: async () => {
        if (isLoading) return;
        isLoading = true;
        (loadMoreButton as HTMLButtonElement).disabled = true;
        loadMoreButton.textContent = 'Loading...';

        try {
          const nextPage = currentPageNumber + 1;
          const response =
            currentPage === 'following'
              ? await getPostsFromFollowedUsers({ page: nextPage, limit })
              : await getPosts({ page: nextPage, limit });

          if (response && response.data && response.data.length > 0) {
            appendPosts(response.data);
            currentPageNumber = nextPage;
            // If fewer than limit returned, no more pages
            if (response.data.length < limit) {
              loadMoreButton.remove();
            } else {
              loadMoreButton.textContent = 'Load more';
              (loadMoreButton as HTMLButtonElement).disabled = false;
            }
          } else {
            loadMoreButton.remove();
          }
        } catch (error) {
          loadMoreButton.textContent = 'Load more';
          (loadMoreButton as HTMLButtonElement).disabled = false;
        } finally {
          isLoading = false;
        }
      },
    });
    loadMoreButton.classList.add('mt-2', 'w-full');
    feedContainer.appendChild(loadMoreButton);
  }

  return feedContainer;
}
