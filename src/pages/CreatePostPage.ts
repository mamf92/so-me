import { renderPostCreationForm } from '../components/forms/CreatePostForm';

export function renderCreatePostPage() {
  const createPostContainer = document.createElement('div');
  createPostContainer.className =
    'flex flex-col items-center justify-center w-full';
  createPostContainer.appendChild(renderPostCreationForm());
  return createPostContainer;
}
