import { renderPost } from '../components/ui/Post';
import { getPostById, type SinglePostResponse } from '../api/postsService';
import { showPopup } from '../components/ui/Popups';
import { showPageSpinner, hidePageSpinner } from '../components/ui/Spinners';

async function getPostForPostPage(): Promise<SinglePostResponse | void> {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  try {
    if (!id) {
      throw new Error('Post ID is missing.');
    }
    const postId = parseInt(id, 10);
    return await getPostById(postId);
  } catch (error) {
    console.error('Error fetching post for post page:', error);
    if (error instanceof Error) {
      showPopup({
        title: 'Error fetching post',
        message: error.message,
        icon: 'error',
      });
    }
  }
}

export async function renderPostPage() {
  const postContainer = document.createElement('div');
  postContainer.className = 'flex flex-col items-center justify-center w-full';
  showPageSpinner();
  try {
    const post = await getPostForPostPage();
    if (!post) {
      throw new Error('Post not found.');
    }
    postContainer.appendChild(renderPost(post));
    return postContainer;
  } catch (error) {
    if (error instanceof Error) {
      showPopup({
        title: 'Error rendering post',
        message: error.message,
        icon: 'error',
      });
    }
  } finally {
    hidePageSpinner();
  }
  return postContainer;
}
