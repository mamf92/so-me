import { isAuthenticated } from '../api/authService';
import { getPosts } from '../api/postsService';
import { getProfileByName } from '../api/profilesService';
import { renderProfileCard } from '../components/ui/ProfileCard';
import { showPageSpinner, hidePageSpinner } from '../components/ui/Spinners';
import { showPopup } from '../components/ui/Popups';

async function getUniqueAuthorNamesFromPosts({
  page = 1,
  limit = 30,
}: { page?: number; limit?: number } = {}): Promise<string[]> {
  const response = await getPosts({ page, limit });
  if (!response || !response.data) return [];

  const seen = new Set<string>();
  const names: string[] = [];

  for (const post of response.data) {
    const name = post.author?.name;
    if (name && !seen.has(name)) {
      seen.add(name);
      names.push(name);
    }
  }
  return names;
}

async function getProfilesForExplorePage(names: string[]) {
  const settled = await Promise.allSettled(
    names.map((name) => getProfileByName(name))
  );
  const profiles = [];
  for (const result of settled) {
    if (result.status === 'fulfilled' && result.value?.data) {
      profiles.push(result.value.data);
    }
  }
  return profiles;
}

export async function renderExplorePage() {
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
  container.className = 'flex flex-col items-center justify-center mb-[10rem]';

  const feedContainer = document.createElement('div');
  feedContainer.className =
    'flex flex-col items-center justify-center w-full gap-6';
  container.appendChild(feedContainer);

  showPageSpinner();
  try {
    const authorNames = await getUniqueAuthorNamesFromPosts({
      page: 1,
      limit: 30,
    });
    if (authorNames.length === 0) {
      throw new Error('No authors found from posts.');
    }

    const profiles = await getProfilesForExplorePage(authorNames);

    if (profiles.length === 0) {
      throw new Error('No profiles found for the authors.');
    }

    for (const profile of profiles) {
      feedContainer.appendChild(renderProfileCard(profile));
    }
  } catch (error) {
    if (error instanceof Error) {
      showPopup({
        title: 'Error rendering explore page',
        message: error.message,
        icon: 'error',
      });
    }
  } finally {
    hidePageSpinner();
  }

  return container;
}
