import { TextInput } from './inputs/TextInput';
import { Button } from '../ui/Buttons';

export function renderLoginForm() {
  const formContainer = document.createElement('div');
  formContainer.className =
    'flex flex-col w-[90vw] bg-white p-4 py-5 lg:px-8 lg:py-6 rounded-3xl border-8 lg:border-16 border-black lg:max-w-[42.5rem] gap-8';

  const formTitle = document.createElement('h1');
  formTitle.innerText = 'Login';
  formTitle.className = 'text-4xl lg:text-6xl font-extrabold self-center';

  const formDescription = document.createElement('p');
  formDescription.innerHTML =
    'Do you have an account? Register <a href="/register" class="underline">here</a>.';
  formDescription.className = 'text-lg font-body self-center';

  const form = document.createElement('form');
  form.id = 'login-form';
  form.className = 'flex flex-col gap-8 w-full items-center';

  const emailInput = TextInput({
    id: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
    title: 'EmailTitle',
  });
  emailInput.classList.add('w-full');

  const passwordInput = TextInput({
    id: 'password',
    label: 'Password',
    type: 'password',
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
