import { LinkButton } from '../ui/Buttons';
import { showPopup } from '../ui/Popups';

const BASE = import.meta.env.BASE_URL;

export type HeaderProps = 'feed' | 'profile' | 'explore' | null;

export function Header(currentPage: HeaderProps): HTMLElement {
  const headerContent = document.createElement('div');
  headerContent.className =
    'bg-white flex flex-col items-center gap-6 pt-10 pb-6';

  const top = document.createElement('div');
  top.className = 'w-full flex justify-center';

  const logo = document.createElement('a');
  logo.href = BASE;
  logo.className =
    'color-black font-heading text-3xl lg:text-6xl font-bold flex flex-row';
  logo.append('So Me');

  const exclamation = document.createElement('div');
  exclamation.className =
    'inline-block bg-gradient-to-br from-red-900 via-orange-500 to-yellow-200 ' +
    'bg-clip-text text-transparent ' +
    'transition-[background-position] duration-700 ease-linear ' +
    'bg-[length:400%_100%] bg-[position:0%_50%] hover:bg-[position:100%_50%]';
  exclamation.textContent = '!';
  logo.appendChild(exclamation);
  const logoutBtn = document.createElement('button');
  logoutBtn.type = 'button';
  logoutBtn.className =
    'absolute top-2 right-4 text-xs md:text-sm lg:text-base font-bold px-3 py-2 rounded-xl ' +
    'border-4 md:border-6 border-black bg-white hover:bg-black hover:text-white';
  logoutBtn.textContent = 'Logout';
  logoutBtn.addEventListener('click', () => {
    try {
      localStorage.removeItem('userName');
      localStorage.removeItem('accessToken');
    } catch (error) {
      if (!(error instanceof Error)) {
        showPopup({
          title: 'An unknown error occurred during logout.',
          message: 'Please try again.',
          icon: 'error',
        });
        throw error;
      }
    }
    window.location.href = BASE + 'login';
  });

  top.appendChild(logo);
  top.appendChild(logoutBtn);
  headerContent.appendChild(top);

  const nav = document.createElement('nav');
  nav.className =
    'max-w-[64rem] mb-6 flex w-full justify-around xl:justify-between';

  const feedLink = LinkButton({
    label: 'Feed',
    href: BASE,
    size: 'large',
    fill: currentPage === 'feed',
  });
  const profileLink = LinkButton({
    label: 'Profile',
    href: BASE + 'myprofile',
    size: 'large',
    fill: currentPage === 'profile',
  });
  const exploreLink = LinkButton({
    label: 'Explore',
    href: BASE + 'explore',
    size: 'large',
    fill: currentPage === 'explore',
  });

  nav.appendChild(feedLink);
  nav.appendChild(profileLink);
  nav.appendChild(exploreLink);

  headerContent.appendChild(nav);

  return headerContent;
}
