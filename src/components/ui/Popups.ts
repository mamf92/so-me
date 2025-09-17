import { Button } from './Buttons';

/**
 * Displays an error popup with a message and title
 * @param title - The title of the error popup
 * @param message - The error message to display
 */

export function showErrorPopup(title: string, message: string): void {
  const errorPopup = document.createElement('div');
  errorPopup.className =
    'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-16 outline-black rounded-lg z-[1000] flex flex-col items-center justify-center w-[60vw] md:min-w-[21rem] bg-white p-8 gap-6';

  const errorPopupContent = document.createElement('div');
  errorPopupContent.className =
    'flex flex-row items-center w-full max-h-[9.375rem]';

  const errorPopupText = document.createElement('div');
  errorPopupText.className =
    'flex flex-col w-[calc(100%-9.25rem)] text-black gap-0.5 p-4';

  const errorPopupTitle = document.createElement('h2');
  errorPopupTitle.className = 'font-heading text-4xl font-extrabold';
  errorPopupTitle.textContent = title;

  const errorPopupMessage = document.createElement('p');
  errorPopupMessage.className = 'font-body text-lg';
  errorPopupMessage.textContent = message;

  const errorPopupIconContainer = document.createElement('div');
  errorPopupIconContainer.className = 'flex justify-center h-[9.25rem]';

  const errorPopupIcon = document.createElement('svg');
  errorPopupIcon.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[9.25rem] w-[9.25rem]"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /> </svg>';

  const errorPopupActions = document.createElement('div');
  errorPopupActions.className =
    'flex flex-row width-full justify-center gap-2 p-6 md:gap-0';

  const errorPopupCloseButton = Button({
    label: 'Close',
    size: 'small',
    onClick: () => errorPopup.remove(),
  });

  errorPopup.appendChild(errorPopupContent);
  errorPopupContent.appendChild(errorPopupText);
  errorPopupText.appendChild(errorPopupTitle);
  errorPopupText.appendChild(errorPopupMessage);
  errorPopupContent.appendChild(errorPopupIconContainer);
  errorPopupIconContainer.appendChild(errorPopupIcon);
  errorPopup.appendChild(errorPopupActions);
  errorPopupActions.appendChild(errorPopupCloseButton);
  document.body.appendChild(errorPopup);
  errorPopup.classList.add('show');
}

/**
 * Creates and displays a confirmation popup that returns a Promise resolving to user's choice
 * The popup includes cancel and confirm buttons, with a warning icon
 * @param {string} message - The confirmation message to display in the popup body
 * @param {string} title - The title/heading to display in the popup
 * @returns {Promise<boolean>} Promise that resolves to true if user confirms, false if user cancels
 */

export function showConfirmationPopup(
  title: string,
  message: string
): Promise<boolean> {
  return new Promise((resolve) => {
    const confirmationPopup = document.createElement('div');
    confirmationPopup.className =
      'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-16 outline-black rounded-lg z-[1000] flex flex-col items-center justify-center w-[60vw] md:min-w-[21rem] bg-white p-8 gap-6';

    const confirmationPopupContent = document.createElement('div');
    confirmationPopupContent.className =
      'flex flex-row items-center w-full max-h-[9.375rem]';

    const confirmationPopupText = document.createElement('div');
    confirmationPopupText.className =
      'flex flex-col w-[calc(100%-9.25rem)] text-black gap-0.5 p-4';

    const confirmationPopupTitle = document.createElement('h3');
    confirmationPopupTitle.className = 'font-heading text-4xl font-extrabold';
    confirmationPopupTitle.textContent = title;

    const confirmationPopupMessage = document.createElement('p');
    confirmationPopupMessage.className = 'font-body text-lg';
    confirmationPopupMessage.textContent = message;

    const confirmationPopupIconContainer = document.createElement('div');
    confirmationPopupIconContainer.className =
      'flex justify-center h-[9.25rem]';

    const confirmationPopupIcon = document.createElement('svg');
    confirmationPopupIcon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[9.25rem] w-[9.25rem]"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /> </svg>';

    const confirmationPopupActions = document.createElement('div');
    confirmationPopupActions.className =
      'flex flex-row width-full justify-center gap-8 p-6';

    const confirmationPopupCancelButton = Button({
      label: 'Cancel',
      size: 'small',
      onClick: () => {
        confirmationPopup.remove();
        resolve(false);
      },
    });

    const confirmationPopupConfirmButton = Button({
      label: 'Confirm',
      size: 'small',
      fill: true,
      onClick: () => {
        confirmationPopup.remove();
        resolve(true);
      },
    });

    confirmationPopup.appendChild(confirmationPopupContent);
    confirmationPopupContent.appendChild(confirmationPopupText);
    confirmationPopupText.appendChild(confirmationPopupTitle);
    confirmationPopupText.appendChild(confirmationPopupMessage);
    confirmationPopupContent.appendChild(confirmationPopupIconContainer);
    confirmationPopupIconContainer.appendChild(confirmationPopupIcon);
    confirmationPopup.appendChild(confirmationPopupActions);
    confirmationPopupActions.appendChild(confirmationPopupCancelButton);
    confirmationPopupActions.appendChild(confirmationPopupConfirmButton);

    document.body.appendChild(confirmationPopup);
    confirmationPopup.classList.add('show');
  });
}
