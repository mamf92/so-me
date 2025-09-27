import { isAuthenticated } from '../api/authService';
import type { PostsResponse } from '../api/postsService';
import { getPostsByProfile, getProfileByName } from '../api/profilesService';
import type { PostsByProfileProps } from '../api/profilesService';
import { renderProfileCard } from '../components/ui/ProfileCard';
import { showPageSpinner, hidePageSpinner } from '../components/ui/Spinners';
import { showPopup } from '../components/ui/Popups';
import { renderProfileFeedSection } from '../components/sections/ProfileFeedSection';

function getProfileNameFromURL(): string {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const checkedUserName = urlParams.get('name');

  if (!checkedUserName) {
    showPopup({
      title: 'Profile name is missing in URL',
      message: 'Please provide a profile name in the URL as a query parameter.',
      icon: 'warning',
    });
    setTimeout(() => {
      window.location.href = '/explore';
    }, 3000);
    throw new Error('Profile name is missing in URL');
  }
  return checkedUserName;
}

async function getProfileForProfilePage(name: string) {
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

  const profileName = getProfileNameFromURL();

  const container = document.createElement('div');
  container.className =
    'flex flex-col items-center justify-center gap-12 mb-[10rem]';

  const profileContainer = document.createElement('div');
  profileContainer.className =
    'flex flex-col items-center justify-center w-full';
  container.appendChild(profileContainer);

  const feedContainer = document.createElement('div');
  feedContainer.className = 'flex flex-col items-center justify-center w-full';
  container.appendChild(feedContainer);

  const profileData = await getProfileForProfilePage(profileName);
  if (profileData) {
    console.log('Profile data:', profileData);
    const profileCard = renderProfileCard(profileData);
    profileContainer.appendChild(profileCard);
  }
  showPageSpinner();
  const postsResponse = await getPostsForProfileFeed({ name: profileName });
  if (postsResponse) {
    console.log('Posts response:', postsResponse);
    const feedSection = renderProfileFeedSection(postsResponse.data);
    feedContainer.appendChild(feedSection);
  }
  hidePageSpinner();

  return container;
}
