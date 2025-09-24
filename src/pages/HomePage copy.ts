import { renderFeedSection } from '../components/sections/FeedSection';
import { getPosts, getPostsFromFollowedUsers } from '../api/postsService';
import { showPageSpinner, hidePageSpinner } from '../components/ui/Spinners';
import { showPopup } from '../components/ui/Popups';

async function getAllPostsForFeed() {
  try {
    const postsPromise = getPosts({ page: 1, limit: 10 });
    const posts = await postsPromise;
    return posts?.data || [];
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

async function getFollowedPostsForFeed() {
  try {
    const postsPromise = getPostsFromFollowedUsers({ page: 1, limit: 10 });
    const posts = await postsPromise;
    return posts?.data || [];
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

export async function renderHomePage() {
  const container = document.createElement('div');
  container.className =
    'flex flex-col items-center justify-center gap-8 mb-[10rem]';

  showPageSpinner();
  try {
    const postsPromise = getPosts({ page: 1, limit: 10 });
    const posts = await postsPromise;
    if (posts && posts.data) {
      const feedSection = renderFeedSection(posts.data || '');
      container.appendChild(feedSection);
    } else {
      container.appendChild(renderFeedSection([]));
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
