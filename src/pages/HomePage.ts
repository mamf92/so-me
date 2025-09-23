import { renderFeedSection } from '../components/sections/FeedSection';
import { getPosts } from '../api/postsService';

export async function renderHomePage() {
  const container = document.createElement('div');

  container.className =
    'flex flex-col items-center justify-center gap-8 mb-[10rem]';

  const postsPromise = getPosts({ page: 1, limit: 10 });
  const posts = await postsPromise;
  if (posts && posts.data) {
    const feedSection = renderFeedSection(posts.data || '');
    container.appendChild(feedSection);
  } else {
    container.appendChild(renderFeedSection([]));
  }
  return container;
}
