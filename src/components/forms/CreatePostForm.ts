import { TextInput } from './inputs/TextInput';
import { TextArea } from './inputs/TextArea';
import { Button } from '../ui/Buttons';
import { createPost } from '../../api/postsService';
import { showPopup } from '../ui/Popups';

/**
 * Handles the login form submission
 * @param event - The submit event
 */
export async function handleCreatePostFormSubmit(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;
  const tags = formData.get('tags') as string;
  const image = formData.get('image') as string;
  const alt = formData.get('image-alt') as string;
  try {
    const response = await createPost({
      title,
      body,
      tags: tags
        .split(/[,\s]+/)
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
      media: {
        url: image,
        alt: alt,
      },
    });
    if (response && response.data) {
      showPopup({
        title: 'Post created!',
        message: 'Your post has been created successfully.',
        icon: 'success',
      });
      setTimeout(() => {
        window.location.href = `/post?id=${response.data.id}`;
      }, 2000);
    }
  } catch (error) {
    if (error instanceof Error) {
      showPopup({
        title: 'Error creating post.',
        message: error.message,
        icon: 'error',
      });
    }
  }
}

/**
 * Renders the post creation form.
 * @returns The form container element.
 */

export function renderPostCreationForm() {
  const formContainer = document.createElement('div');
  formContainer.className =
    'flex flex-col w-[90vw] bg-white px-8 py-6 rounded-3xl border-16 border-black gap-4 lg:max-w-[42.5rem]';

  const formTitle = document.createElement('h1');
  formTitle.innerText = 'Create a post';
  formTitle.className = 'text-4xl font-extrabold self-center';

  const formDescription = document.createElement('p');
  formDescription.innerHTML =
    'Fill in the required fields * and any extra fields if you want to. When done, click Publish. You can always edit your post later.';
  formDescription.className = 'text-md font-body self-center';

  const form = document.createElement('form');
  form.id = 'post-creator-form';
  form.className = 'flex flex-col gap-4 w-full items-center';
  form.addEventListener('submit', handleCreatePostFormSubmit);

  const postTitle = TextInput({
    id: 'post-title',
    name: 'title',
    label: 'Post Title*',
    type: 'text',
    pattern: '^.{3,60}$',
    placeholder: 'Title. Max 60 characters',
    required: true,
    title: 'Title must be between 3 and 60 characters',
    maxLength: 60,
    minLength: 1,
  });
  postTitle.classList.add('w-full');

  const bodyInput = TextArea({
    id: 'post-body',
    label: 'Post Body*',
    name: 'body',
    placeholder: 'Write your post content here.',
    required: true,
    title: 'Post body must be between 3 and 280 characters',
    minLength: 3,
    maxLength: 280,
  });
  bodyInput.classList.add('w-full');

  const tagsInput = TextInput({
    id: 'post-tags',
    name: 'tags',
    label: 'Tags',
    type: 'text',
    pattern: '^([a-zA-Z0-9]{3,}(?:[,\\s]+[a-zA-Z0-9]{3,})*)*$',
    placeholder:
      'Enter tags separated by commas or spaces. No special characters. (Optional)',
    required: false,
    title:
      'Min 3 chars. Tags must be separated by commas or spaces. No special characters.',
  });
  tagsInput.classList.add('w-full');

  const imgLinkInput = TextInput({
    id: 'img-link',
    name: 'image',
    label: 'Image Link',
    type: 'url',
    placeholder: 'Enter an image link (optional)',
    required: false,
    title: 'Link must be a valid image URL',
    pattern: 'https?://.*.(?:png|jpg|jpeg|gif|svg)',
  });
  imgLinkInput.classList.add('w-full');

  const imgAltInput = TextInput({
    id: 'img-alt',
    name: 'image-alt',
    label: 'Image Alt Text',
    type: 'text',
    pattern: '^.{3,150}$',
    placeholder: 'Enter image alt text. (Optional)',
    required: false,
    title: 'Alt text must be 150 characters or less',
  });
  imgAltInput.classList.add('w-full');

  const submitButton = Button({
    label: 'Publish',
    size: 'medium',
  });
  submitButton.classList.add('mt-4');

  form.appendChild(postTitle);
  form.appendChild(bodyInput);
  form.appendChild(tagsInput);
  form.appendChild(imgLinkInput);
  form.appendChild(imgAltInput);
  form.appendChild(submitButton);
  formContainer.appendChild(formTitle);
  formContainer.appendChild(formDescription);
  formContainer.appendChild(form);
  return formContainer;
}
