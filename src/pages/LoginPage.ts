import { renderLoginForm } from '../components/forms/LoginForm';

export function renderLoginPage() {
  const loginViewContainer = document.createElement('div');
  loginViewContainer.className =
    'flex flex-col items-center justify-center w-full';
  loginViewContainer.appendChild(renderLoginForm());
  return loginViewContainer;
}
