import { TextInput } from './inputs/TextInput';
import { Button } from '../ui/Buttons';
/**
 * Handles the search form submission
 * @param event - The submit event
 */
export async function handleSearchFormSubmit(
  event: Event,
  onSearch: (query: string) => void
) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const query = formData.get('search') as string;
  onSearch(query);
}

export function renderSearchField(onSearch: (query: string) => void) {
  const formContainer = document.createElement('div');
  formContainer.className =
    'flex flex-col w-[90vw] bg-white p-4 py-5 lg:px-8 lg:py-6 rounded-3xl border-8 lg:border-16 border-black lg:max-w-[42.5rem] gap-8';

  const formTitle = document.createElement('h1');
  formTitle.innerText = 'Search';
  formTitle.className = 'text-md lg:text-6xl font-extrabold self-center';

  const formDescription = document.createElement('p');
  formDescription.innerHTML = 'Search for keywords in posts.';
  formDescription.className = 'text-xs font-body self-center';

  const form = document.createElement('form');
  form.id = 'search-form';
  form.className = 'flex flex-col gap-8 w-full items-center';
  form.addEventListener('submit', (event) =>
    handleSearchFormSubmit(event, onSearch)
  );

  const searchInput = TextInput({
    id: 'search',
    name: 'search',
    label: 'Search',
    type: 'text',
    placeholder: 'Enter one search keyword',
    pattern: '\\S{1,30}',
    required: true,
    title: 'Only one keyword, max 30 characters',
  });

  const submitButton = Button({
    label: 'Search',
    size: 'medium',
  });

  form.appendChild(searchInput);
  form.appendChild(submitButton);
  formContainer.appendChild(formTitle);
  formContainer.appendChild(formDescription);
  formContainer.appendChild(form);
  return formContainer;
}
