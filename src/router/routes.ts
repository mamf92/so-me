import { renderLoginPage } from '../pages/LoginPage';
import { renderRegistrationPage } from '../pages/RegistrationPage';
import { renderHomePage } from '../pages/HomePage';
import { renderExplorePage } from '../pages/ExplorePage';
import { renderProfilePage } from '../pages/ProfilePage';
import { renderEditPostpage } from '../pages/EditPostPage';
import { renderPostPage } from '../pages/PostPage';
import { renderTestPage } from '../pages/TestPage';

export const routes = {
  '/': renderHomePage,
  '/explore': renderExplorePage,
  '/post': renderPostPage,
  '/login': renderLoginPage,
  '/register': renderRegistrationPage,
  '/profile': renderProfilePage,
  '/edit': renderEditPostpage,
  '/test': renderTestPage,
};
