import { isAuthenticated } from '../api/authService';
import { getPostsFromFollowedUsers } from '../api/postsService';
import type { PostsResponse, PaginationProps, Post } from '../api/postsService';
import {
  getPostsByProfile,
  getFollowingNames,
  getProfileByName,
} from '../api/profilesService';
import type { PostsByProfileProps } from '../api/profilesService';
import { renderMyProfileCard } from '../components/ui/MyProfileCard';
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

async function getMyProfileForMyProfilePage(name: string) {
  try {
    const response = await getProfileByName(name);
    if (!response) {
      throw new Error('Could not fetch your profile.');
    }
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      showPopup({
        title: 'Error fetching your profile.',
        message: error.message,
        icon: 'error',
      });
    }
  }
}

export async function renderMyProfilePage() {
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

  const profileContainer = document.createElement('div');
  profileContainer.className =
    'flex flex-col items-center justify-center w-full';
  container.appendChild(profileContainer);

  const feedContainer = document.createElement('div');
  feedContainer.className = 'flex flex-col items-center justify-center w-full';
  container.appendChild(feedContainer);

  const profile = await getMyProfileForMyProfilePage(checkedUserName);
  if (profile) {
    const profileCard = renderMyProfileCard(profile);
    profileContainer.appendChild(profileCard);
  }

  async function fetchPosts(
    feed: CurrentFeed
  ): Promise<{ posts: Post[]; followingNames?: Set<string> }> {
    if (feed === 'newest') {
      const response = await getPostsForProfileFeed({
        name: checkedUserName,
        page: 1,
        limit: 10,
      });
      return {
        posts: response?.data || [],
        followingNames: new Set<string>(),
      };
    } else {
      const [postsResponse, followingNames] = await Promise.all([
        getFollowedPostsForFollowingFeed({ page: 1, limit: 10 }),
        getFollowingNames(checkedUserName),
      ]);
      return { posts: postsResponse?.data || [], followingNames };
    }
  }

  async function renderProfileFeedSection(feed: CurrentFeed) {
    showPageSpinner();
    currentFeed = feed;
    try {
      const { posts, followingNames } = await fetchPosts(feed);
      const feedSection = renderMyPostsSection({
        posts: posts,
        currentPage: currentFeed,
        onChangeFeed: (next) => {
          if (next !== currentFeed) {
            renderProfileFeedSection(next);
          }
        },
        followingNames: followingNames,
      });
      feedContainer.replaceChildren(feedSection);
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
