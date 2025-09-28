import type { Post } from '../../api/postsService';
import { renderPostCard } from '../ui/PostCard';
import { requestConfirmation } from '../ui/Popups';
const BASE = import.meta.env.BASE_URL;

export function renderProfileFeedSection(posts: Post[]): HTMLElement {
  const profileFeedContainer = document.createElement('section');
  profileFeedContainer.innerHTML = '';
  profileFeedContainer.className =
    'flex flex-col w-full gap-4 justify-center items-center max-w-[calc(100%-2rem)] lg:max-w-[42.5rem]';

  if (posts.length === 0) {
    requestConfirmation({
      title: 'No post here.',
      message: 'This user has no posts yet!',
      icon: 'warning',
      confirmationLabel: 'Explore other profiles',
      cancellationLabel: 'Close',
    }).then((confirmed) => {
      if (confirmed) {
        window.location.href = BASE + 'explore';
      }
    });
    const emptyFeedMessage = document.createElement('img');
    const gifUrl = new URL('../../assets/gifs/mac-looking.gif', import.meta.url)
      .href;
    emptyFeedMessage.src = gifUrl;
    emptyFeedMessage.alt = 'No posts';
    emptyFeedMessage.className = 'w-auto h-48 mb-4';
    profileFeedContainer.appendChild(emptyFeedMessage);
    return profileFeedContainer;
  }

  posts.forEach((post) => {
    const postCard = renderPostCard(post);
    postCard.addEventListener('click', () => {
      window.location.href = BASE + `post?id=${post.id}`;
    });
    profileFeedContainer.appendChild(postCard);
  });

  return profileFeedContainer;
}
