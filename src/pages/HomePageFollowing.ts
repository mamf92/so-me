import { isAuthenticated } from '../api/authService';
import { getPosts, getPostsFromFollowedUsers } from '../api/postsService';
import { renderFeedSection } from '../components/sections/FeedSection';
import { showPageSpinner, hidePageSpinner } from '../components/ui/Spinners';
import { showPopup } from '../components/ui/Popups';
import type { PaginationProps } from '../api/postsService';
import type { PostsResponse } from '../api/postsService';

async function getFollowedPostsForFollowingFeed({
  page = 1,
  limit = 10,
}: PaginationProps): Promise<PostsResponse | void> {
  try {
    const postsPromise = getPostsFromFollowedUsers({ page, limit });
    const posts = await postsPromise;
    return posts;
  } catch (error) {
    if (error instanceof Error) {
      showPopup({
        title: 'Error fetching followed posts for feed.',
        message: error.message,
        icon: 'error',
      });
    }
  }
}

export async function renderHomePageWithFollowingFeed() {
  const isLoggedIn = isAuthenticated();
  if (!isLoggedIn) {
    showPopup({
      title: 'You are not logged in',
      message: 'Please log in to see your feed.',
      icon: 'warning',
    });
    setTimeout(() => {
      window.location.href = '/login';
    }, 3000);
    return;
  }

  const container = document.createElement('div');
  container.className =
    'flex flex-col items-center justify-center gap-8 mb-[10rem]';

  showPageSpinner();
  try {
    const posts = await getFollowedPostsForFollowingFeed({
      page: 1,
      limit: 10,
    });
    if (posts && posts.data) {
      const feedSection = renderFeedSection({
        posts: posts.data,
        currentPage: 'following',
      });
      container.appendChild(feedSection);
    }
  } catch (error) {
    if (error instanceof Error) {
      showPopup({
        title: 'Error rendering home page.',
        message: error.message,
        icon: 'error',
      });
    }
  }

  hidePageSpinner();

  return container;
}
