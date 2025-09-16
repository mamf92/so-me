import { loginView } from '../pages/LoginPage';
import { registerView } from '../pages/RegisterPage';
import { homeView } from '../pages/HomePage';
import { exploreView } from '../pages/ExplorePage';
import { profileView } from '../pages/ProfilePage';
import { postView } from '../pages/PostPage';

export const routes = {
  '/': homeView,
  '/explore': exploreView,
  '/post': postView,
  '/login': loginView,
  '/register': registerView,
  '/profile': profileView,
};
