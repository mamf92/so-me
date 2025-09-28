import { TextInput } from './inputs/TextInput';
import { Button } from '../ui/Buttons';
import { login } from '../../api/authService';
import { showPopup } from '../ui/Popups';
const BASE = import.meta.env.BASE_URL;

/**
 * Handles the login form submission
 * @param event - The submit event
 */
export async function handleLoginFormSubmit(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const response = await login({ email: email, password: password });
    if (response && response.data && response.data.accessToken) {
      window.location.href = BASE;
    }
  } catch (error) {
    const errorMessage =
      (error as Error)?.message +
        '. Please check your email and password, and try again.' ||
      'Please check your email and password, and try again.';
    showPopup({ title: 'Login failed.', message: errorMessage, icon: 'error' });
  }
}

export function renderLoginForm() {
  const formContainer = document.createElement('div');
  formContainer.className =
    'flex flex-col w-[90vw] bg-white p-4 py-5 lg:px-8 lg:py-6 rounded-3xl border-8 lg:border-16 border-black lg:max-w-[42.5rem] gap-8';

  const formTitle = document.createElement('h1');
  formTitle.innerText = 'Login';
  formTitle.className = 'text-4xl lg:text-6xl font-extrabold self-center';

  const formDescription = document.createElement('p');
  formDescription.innerHTML = `Do you have an account? Register <a href="${BASE}register" class="underline">here</a>.`;
  formDescription.className = 'text-lg font-body self-center';

  const form = document.createElement('form');
  form.id = 'login-form';
  form.className = 'flex flex-col gap-8 w-full items-center';
  form.addEventListener('submit', handleLoginFormSubmit);

  const emailInput = TextInput({
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your @stud.noroff.no email',
    pattern: '^[a-zA-Z0-9._%+\\-]+@stud\\.noroff\\.no$',
    required: true,
    title: 'EmailTitle',
  });
  emailInput.classList.add('w-full');

  const passwordInput = TextInput({
    id: 'password',
    name: 'password',
    label: 'Password',
    type: 'password',
    pattern: '^.{8,}$',
    placeholder: 'Enter your password',
    required: true,
    title: 'PasswordTitle',
  });
  passwordInput.classList.add('w-full');

  const submitButton = Button({
    label: 'Login',
    size: 'medium',
  });

  form.appendChild(emailInput);
  form.appendChild(passwordInput);
  form.appendChild(submitButton);
  formContainer.appendChild(formTitle);
  formContainer.appendChild(formDescription);
  formContainer.appendChild(form);
  return formContainer;
}
