import { Button } from './Buttons';

type IconVariants = 'error' | 'warning' | 'success';

interface PopupProps {
  title: string;
  message: string;
  icon: IconVariants;
}

interface ConfirmationPopupProps extends PopupProps {
  confirmationLabel?: string;
  cancellationLabel?: string;
}

const ICONS: Record<IconVariants, string> = {
  error:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor" class="h-[9.25rem] w-[9.25rem]"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /> </svg>',
  warning:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor" class="h-[9.25rem] w-[9.25rem]"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /> </svg>',
  success:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor" class="h-[9.25rem] w-[9.25rem]"> <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /> </svg>',
};

/**
 * Displays a popup with a message and title
 * @param title - The title of the popup
 * @param message - The message to display
 * @param icon - The icon variant to use (error, warning, success)
 * @return The popup HTML element
 */

export function showPopup({ title, message, icon }: PopupProps): HTMLElement {
  const Popup = document.createElement('div');
  Popup.className =
    'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-8 lg:border-16 border-black rounded-2xl z-[1000] flex flex-col items-center justify-center w-[95vw] max-w-[35rem] md:min-w-[21rem] bg-white px-2 lg:px-6 pt-6 pb-2 gap-4';

  const PopupContent = document.createElement('div');
  PopupContent.className = 'flex flex-row items-center w-full max-h-[9.375rem]';

  const PopupText = document.createElement('div');
  PopupText.className =
    'flex flex-col w-[calc(100%-9.25rem)] text-black gap-2 p-4';

  const PopupTitle = document.createElement('h2');
  PopupTitle.className = 'font-heading text-3xl lg:text-4xl font-extrabold';
  PopupTitle.textContent = title;

  const PopupMessage = document.createElement('p');
  PopupMessage.className = 'font-body text-lg';
  PopupMessage.textContent = message;

  const PopupIconContainer = document.createElement('div');
  PopupIconContainer.className = 'flex justify-center h-[9.25rem]';

  const PopupIcon = document.createElement('svg');
  PopupIcon.innerHTML = ICONS[icon];

  const PopupActions = document.createElement('div');
  PopupActions.className =
    'flex flex-row width-full justify-center gap-2 p-2 md:gap-0';

  const PopupCloseButton = Button({
    label: 'Close',
    size: 'medium',
    onClick: () => Popup.remove(),
  });

  Popup.appendChild(PopupContent);
  PopupContent.appendChild(PopupText);
  PopupText.appendChild(PopupTitle);
  PopupText.appendChild(PopupMessage);
  PopupContent.appendChild(PopupIconContainer);
  PopupIconContainer.appendChild(PopupIcon);
  Popup.appendChild(PopupActions);
  PopupActions.appendChild(PopupCloseButton);
  document.body.appendChild(Popup);
  Popup.classList.add('show');

  return Popup;
}

/**
 * Displays a confirmation popup with the given title, message, and icon.
 * @param title - The title of the confirmation popup
 * @param message - The message to display in the confirmation popup
 * @param icon - The icon variant to use (error, warning, success)
 * @returns {Promise<boolean>} Promise that resolves to true if user confirms, false if user cancels
 */

export function requestConfirmation({
  title,
  message,
  icon,
  confirmationLabel = 'Confirm',
  cancellationLabel = 'Cancel',
}: ConfirmationPopupProps): Promise<boolean> {
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
    confirmationPopupIcon.innerHTML = ICONS[icon];

    const confirmationPopupActions = document.createElement('div');
    confirmationPopupActions.className =
      'flex flex-row width-full justify-center gap-8 p-6';

    const confirmationPopupCancelButton = Button({
      label: cancellationLabel,
      size: 'small',
      onClick: () => {
        confirmationPopup.remove();
        resolve(false);
      },
    });

    const confirmationPopupConfirmButton = Button({
      label: confirmationLabel,
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
