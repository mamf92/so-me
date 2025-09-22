import { renderRegistrationForm } from '../components/forms/RegistrationForm';

export function renderRegistrationPage() {
  const registerViewContainer = document.createElement('div');
  registerViewContainer.className =
    'flex flex-col items-center justify-center w-full';
  registerViewContainer.appendChild(renderRegistrationForm());
  return registerViewContainer;
}
