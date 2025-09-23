import { TextInput } from './inputs/TextInput';
import { Button } from '../ui/Buttons';
import { register } from '../../api/authService';
import { showPopup } from '../ui/Popups';

export async function handleRegistrationFormSubmit(event: Event) {
  console.log('handleRegistrationFormSubmit called');
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const unformattedName = formData.get('name') as string;
  const name = unformattedName.trim().replace(/\s+/g, '_');
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  console.log('Form Data:', { name, email, password });

  try {
    const response = await register({ name, email, password });
    console.log('Registration successful:', response);
    if (response && response.data) {
      showPopup({
        title: 'Registration successful!',
        message: 'You can now log in with your new account.',
        icon: 'success',
      });
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  } catch (error) {
    const errorMessage =
      (error as Error)?.message || 'An unknown error occurred.';
    showPopup({
      title: 'Registration Error',
      message: errorMessage,
      icon: 'error',
    });
  }
}

export function renderRegistrationForm() {
  const formContainer = document.createElement('div');
  formContainer.className =
    'flex flex-col w-[90vw] bg-white px-4 py-5 lg:px-8 lg:py-6 rounded-3xl border-8 lg:border-16 border-black gap-8 lg:max-w-[42.5rem]';

  const formTitle = document.createElement('h1');
  formTitle.innerText = 'Register account';
  formTitle.className = 'text-4xl lg:text-6xl font-extrabold self-center';

  const formDescription = document.createElement('p');
  formDescription.innerHTML =
    'Already have an account? Login <a href="/login" class="underline">here</a>.';
  formDescription.className = 'text-lg font-body self-center';

  const form = document.createElement('form');
  form.id = 'register-form';
  form.className = 'flex flex-col gap-8 w-full items-center';
  form.addEventListener('submit', handleRegistrationFormSubmit);
  console.log('event listener added to form');

  const nameInput = TextInput({
    id: 'name',
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter your name',
    pattern: '^[a-zA-ZÀ-ÿ\s\-]{3,}+$',
    required: true,
    title: 'Enter your full name. Letters, spaces, and hyphens only.',
  });
  nameInput.classList.add('w-full');

  const emailInput = TextInput({
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
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
    placeholder: 'Enter your password',
    pattern: '^.{8,}$',
    required: true,
    title: 'PasswordTitle',
  });
  passwordInput.classList.add('w-full');

  const submitButton = Button({
    label: 'Register',
    size: 'medium',
  });

  form.appendChild(nameInput);
  form.appendChild(emailInput);
  form.appendChild(passwordInput);
  form.appendChild(submitButton);
  formContainer.appendChild(formTitle);
  formContainer.appendChild(formDescription);
  formContainer.appendChild(form);
  return formContainer;
}
