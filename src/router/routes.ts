import { renderLoginPage } from '../pages/LoginPage';
import { renderRegistrationPage } from '../pages/RegistrationPage';
import { renderHomePage } from '../pages/HomePage';
import { renderExplorePage } from '../pages/ExplorePage';
import { renderMyProfilePage } from '../pages/MyProfilePage';
import { renderEditPostpage } from '../pages/EditPostPage';
import { renderPostPage } from '../pages/PostPage';
import { renderTestPage } from '../pages/TestPage';
import { renderHomePageWithFollowingFeed } from '../pages/HomePageFollowing';
import { renderCreatePostPage } from '../pages/CreatePostPage';
import { renderProfilePage } from '../pages/ProfilePage';

export const routes = {
  '/': renderHomePage,
  '/followingfeed': renderHomePageWithFollowingFeed,
  '/explore': renderExplorePage,
  '/post': renderPostPage,
  '/login': renderLoginPage,
  '/register': renderRegistrationPage,
  '/myprofile': renderMyProfilePage,
  '/create': renderCreatePostPage,
  '/edit': renderEditPostpage,
  '/test': renderTestPage,
  '/profile': renderProfilePage,
};
