import type { Post } from '../../api/postsService';
import { renderPostCard } from '../ui/PostCard';
import { requestConfirmation } from '../ui/Popups';
import { Button } from '../ui/Buttons';
import { getPostsByProfile } from '../../api/profilesService';
const BASE = import.meta.env.BASE_URL;

// Props for the ProfileFeedSection component
interface ProfileFeedSectionProps {
  posts: Post[];
  profileName: string;
  initialPage?: number;
  limit?: number;
}

/**
 * Renders the profile feed section.
 * @param props The properties for the profile feed section
 * @returns The rendered profile feed section element
 */

export function renderProfileFeedSection(
  props: ProfileFeedSectionProps
): HTMLElement {
  const { posts, profileName, initialPage = 1, limit = 10 } = props;

  // Create the profile feed container
  const profileFeedContainer = document.createElement('section');
  profileFeedContainer.innerHTML = '';
  profileFeedContainer.className =
    'flex flex-col w-full gap-4 justify-center items-center max-w-[calc(100%-2rem)] lg:max-w-[42.5rem]';

  // Handle empty state
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

  // Wrapper to append posts into
  const postsWrapper = document.createElement('div');
  postsWrapper.className = 'flex flex-col w-full gap-4';
  profileFeedContainer.appendChild(postsWrapper);

  function appendPosts(list: Post[]) {
    list.forEach((post) => {
      const postCard = renderPostCard(post);
      postCard.addEventListener('click', () => {
        window.location.href = BASE + `post?id=${post.id}`;
      });
      postsWrapper.appendChild(postCard);
    });
  }

  // Initial render
  appendPosts(posts);

  // Pagination state
  let currentPage = initialPage;
  let loading = false;

  // Show button only if we likely have more
  if (posts.length === limit) {
    const loadMoreBtn = Button({
      label: 'Load more',
      size: 'medium',
      fill: false,
      onClick: async () => {
        if (loading) return;
        loading = true;
        (loadMoreBtn as HTMLButtonElement).disabled = true;
        loadMoreBtn.textContent = 'Loading...';

        try {
          const nextPage = currentPage + 1;
          const res = await getPostsByProfile({
            name: profileName,
            page: nextPage,
            limit,
          });

          if (res && res.data && res.data.length > 0) {
            appendPosts(res.data);
            currentPage = nextPage;
            if (res.data.length < limit) {
              loadMoreBtn.remove();
            } else {
              loadMoreBtn.textContent = 'Load more';
              (loadMoreBtn as HTMLButtonElement).disabled = false;
            }
          } else {
            loadMoreBtn.remove();
          }
        } catch {
          loadMoreBtn.textContent = 'Load more';
          (loadMoreBtn as HTMLButtonElement).disabled = false;
        } finally {
          loading = false;
        }
      },
    });
    loadMoreBtn.classList.add('mt-2', 'w-full');
    profileFeedContainer.appendChild(loadMoreBtn);
  }

  return profileFeedContainer;
}
