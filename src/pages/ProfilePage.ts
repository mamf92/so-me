import { isAuthenticated } from '../api/authService';
import { getPostsFromFollowedUsers } from '../api/postsService';
import type { PostsResponse, PaginationProps } from '../api/postsService';
import { getPostsByProfile } from '../api/profilesService';
import type { PostsByProfileProps } from '../api/profilesService';
import { renderMyPostsSection } from '../components/sections/MyPostsSection';
import type { CurrentFeed } from '../components/sections/MyPostsSection';
import { showPageSpinner, hidePageSpinner } from '../components/ui/Spinners';
import { showPopup } from '../components/ui/Popups';

async function getPostsForProfileFeed({
  name,
  page = 1,
  limit = 10,
}: PostsByProfileProps): Promise<PostsResponse | void> {
  try {
    const postsPromise = getPostsByProfile({ name, page, limit });
    const posts = await postsPromise;
    return posts;
  } catch (error) {
    if (error instanceof Error) {
      showPopup({
        title: 'Error fetching your posts.',
        message: error.message,
        icon: 'error',
      });
    }
  }
}

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

export async function renderProfilePage() {
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

  const userName = localStorage.getItem('userName');
  if (!userName) {
    showPopup({
      title: 'User name not found',
      message: 'Please log in again.',
      icon: 'warning',
    });
    setTimeout(() => {
      window.location.href = '/login';
    }, 3000);
    return;
  }

  const checkedUserName: string = userName;
  let currentFeed: CurrentFeed = 'newest';

  const container = document.createElement('div');
  container.className =
    'flex flex-col items-center justify-center gap-8 mb-[10rem]';

  async function fetchPosts(feed: CurrentFeed) {
    if (feed === 'newest') {
      return await getPostsForProfileFeed({
        name: checkedUserName,
        page: 1,
        limit: 10,
      });
    } else {
      return await getFollowedPostsForFollowingFeed({ page: 1, limit: 10 });
    }
  }

  async function renderProfileFeedSection(feed: CurrentFeed) {
    showPageSpinner();
    currentFeed = feed;
    try {
      const posts = await fetchPosts(feed);
      if (posts && posts.data) {
        const feedSection = renderMyPostsSection({
          posts: posts.data,
          currentPage: currentFeed,
          onChangeFeed: (next) => {
            if (next !== currentFeed) {
              renderProfileFeedSection(next);
            }
          },
        });
        container.innerHTML = '';
        container.appendChild(feedSection);
      }
    } catch (error) {
      if (error instanceof Error) {
        showPopup({
          title: 'Error rendering profile page.',
          message: error.message,
          icon: 'error',
        });
      }
    } finally {
      hidePageSpinner();
    }
  }

  await renderProfileFeedSection(currentFeed);

  return container;
}
