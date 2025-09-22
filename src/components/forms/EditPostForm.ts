import { TextInput } from './inputs/TextInput';
import { TextArea } from './inputs/TextArea';
import { Button } from '../ui/Buttons';
import type { Post } from '../../api/postsService';

export function renderPostEditForm(post: Post) {
  const formContainer = document.createElement('div');
  formContainer.className =
    'flex flex-col w-[90vw] bg-white px-8 py-6 rounded-3xl border-16 border-black gap-8 lg:max-w-[42.5rem]';

  const formTitle = document.createElement('h1');
  formTitle.innerText = 'Edit post';
  formTitle.className = 'text-6xl font-extrabold self-center';

  const formDescription = document.createElement('p');
  formDescription.innerHTML =
    'Edit your post below. When done, click Publish changes.';
  formDescription.className = 'text-lg font-body self-center';

  const form = document.createElement('form');
  form.id = 'post-creator-form';
  form.className = 'flex flex-col gap-8 w-full items-center';

  const postTitle = TextInput({
    id: 'post-title',
    label: 'Post Title*',
    type: 'text',
    value: post.title,
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
    placeholder: 'Write your post content here. Max 140 characters',
    value: post.body,
    required: true,
    title: 'Post body must be at least 3 character long',
    maxLength: 140,
    minLength: 3,
  });
  bodyInput.classList.add('w-full');

  const tagsInput = TextInput({
    id: 'post-tags',
    label: 'Tags',
    type: 'text',
    placeholder: 'Enter tags separated by commas (optional)',
    value: post.tags.join(', '),
    required: false,
    title: 'Tags must be comma separated and minimum 3 characters long',
  });
  tagsInput.classList.add('w-full');

  const imgLinkInput = TextInput({
    id: 'img-link',
    label: 'Image Link',
    type: 'url',
    placeholder: 'Enter an image link (optional)',
    value: post.media.url,
    required: false,
    title: 'Link must be a valid image URL',
    pattern: 'https?://.*.(?:png|jpg|jpeg|gif|svg)',
  });
  imgLinkInput.classList.add('w-full');

  const imgAltInput = TextInput({
    id: 'img-alt',
    label: 'Image Alt Text',
    type: 'text',
    placeholder: 'Enter image alt text (optional)',
    value: post.media.alt,
    required: false,
    title: 'Alt text must be minimum 3 characters long',
  });
  imgAltInput.classList.add('w-full');

  const submitButton = Button({
    label: 'Publish changes',
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
