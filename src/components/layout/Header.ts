import { LinkButton } from '../ui/Buttons';

export function Header(): HTMLElement {
  const headerContent = document.createElement('div');
  headerContent.className =
    'bg-white flex flex-col items-center gap-6 pt-10 pb-6';

  const top = document.createElement('div');
  top.className = 'w-full flex justify-center';

  const logo = document.createElement('a');
  logo.href = '/';
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

  top.appendChild(logo);
  headerContent.appendChild(top);

  const nav = document.createElement('nav');
  nav.className =
    'max-w-[64rem] mb-6 flex w-full justify-around xl:justify-between';

  const feedLink = LinkButton({
    label: 'Feed',
    href: '/',
    size: 'large',
    fill: true,
  });
  const profileLink = LinkButton({
    label: 'Profile',
    href: '/profile',
    size: 'large',
    fill: false,
  });
  const exploreLink = LinkButton({
    label: 'Explore',
    href: '/explore',
    size: 'large',
    fill: false,
  });

  nav.appendChild(feedLink);
  nav.appendChild(profileLink);
  nav.appendChild(exploreLink);

  headerContent.appendChild(nav);

  return headerContent;
}
