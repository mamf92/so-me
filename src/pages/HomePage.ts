import { isAuthenticated } from '../api/authService';
import { getPosts } from '../api/postsService';
import { renderFeedSection } from '../components/sections/FeedSection';
import { showPageSpinner, hidePageSpinner } from '../components/ui/Spinners';
import { showPopup } from '../components/ui/Popups';
import type { PaginationProps, PostsResponse } from '../api/postsService';
import { getFollowingNames } from '../api/profilesService';
const BASE = import.meta.env.BASE_URL;

async function getPostsForFeed({
  page = 1,
  limit = 10,
}: PaginationProps): Promise<PostsResponse | void> {
  try {
    const postsPromise = getPosts({ page, limit });
    const posts = await postsPromise;
    return posts;
  } catch (error) {
    if (error instanceof Error) {
      showPopup({
        title: 'Error fetching posts for feed.',
        message: error.message,
        icon: 'error',
      });
    }
  }
}

export async function renderHomePage() {
  const isLoggedIn = isAuthenticated();
  if (!isLoggedIn) {
    showPopup({
      title: 'You are not logged in',
      message: 'Please log in to see your feed.',
      icon: 'warning',
    });
    setTimeout(() => {
      window.location.href = BASE + 'login';
    }, 3000);
    return;
  }

  const container = document.createElement('div');
  container.className =
    'flex flex-col items-center justify-center gap-8 mb-[10rem]';

  showPageSpinner();
  try {
    const [posts, followingNames] = await Promise.all([
      getPostsForFeed({ page: 1, limit: 10 }),
      getFollowingNames(localStorage.getItem('userName') || ''),
    ]);
    if (posts && posts.data) {
      const feedSection = renderFeedSection({
        posts: posts.data,
        currentPage: 'newest',
        followingNames: followingNames || new Set<string>(),
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
