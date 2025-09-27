import { type Profile } from '../../api/profilesService';

export function renderProfileCard(profile: Profile): HTMLElement {
  if (!profile) {
    console.error('No profile data provided to renderProfileCard.');

    return document.createElement('div');
  }
  const profileCard = document.createElement('article');
  profileCard.className =
    'profile-card flex flex-col w-[calc(100%-2rem)] sm:max-w-[42.5rem] justify-center items-center sm:flex-row lg:max-h-[8rem] rounded-2xl border-8 border-black overflow-hidden hover:cursor-pointer';
  profileCard.addEventListener('click', () => {
    window.location.href = `/profile?name=${profile.name}`;
  });
  if (profile.avatar) {
    const avatarContainer = document.createElement('div');
    avatarContainer.className =
      'flex justify-center sm:max-w-[calc(20%-1rem)] shrink-0 lg:h-40 lg:w-[calc(20%-1rem)]';
    profileCard.appendChild(avatarContainer);
    const avatarImg = document.createElement('img');
    avatarImg.src = profile.avatar.url;
    avatarImg.alt = profile.avatar.alt;
    avatarImg.className = 'lg:h-full lg:w-full object-cover';
    avatarContainer.appendChild(avatarImg);
  }

  const content = document.createElement('div');
  content.className = 'flex flex-col w-full gap-2 px-2 py-1 justify-center';

  const header = document.createElement('div');
  header.className = 'flex flex-col lg:flex-row w-full justify-between';

  const authorContainer = document.createElement('div');
  authorContainer.className = 'flex flex-row gap-2 items-center';
  const author = document.createElement('span');
  author.className = 'font-heading text-md font-extrabold';
  author.textContent = profile.name;
  authorContainer.appendChild(author);

  header.appendChild(authorContainer);

  const relations = document.createElement('div');
  relations.className = 'flex flex-row gap-2 items-center';

  const followers = document.createElement('span');
  followers.className = 'font-body text-xs';
  followers.textContent = `Followers: ${profile._count.followers}`;
  relations.appendChild(followers);

  const following = document.createElement('span');
  following.className = 'font-body text-xs';
  following.textContent = `Following: ${profile._count.following}`;
  relations.appendChild(following);
  header.appendChild(relations);
  content.appendChild(header);

  const bio = document.createElement('p');
  bio.className = 'font-body text-xs';
  bio.textContent = profile.bio;
  content.appendChild(bio);

  profileCard.appendChild(content);
  return profileCard;
}
