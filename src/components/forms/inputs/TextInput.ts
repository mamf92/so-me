interface TextInputProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'password' | 'email' | 'url';
  placeholder?: string;
  value?: string;
  required?: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  title?: TitleVariants | string;
  autocomplete?: AutoFill;
}

type TitleVariants = 'PasswordTitle' | 'EmailTitle';

const TITLE_VARIANTS: Record<TitleVariants, string> = {
  PasswordTitle: 'Password must be at least 8 characters long',
  EmailTitle: 'Email must be a @stud.noroff.no address',
};

export function TextInput({
  id,
  name,
  label,
  type,
  placeholder,
  value,
  required,
  title,
  pattern,
  minLength,
  maxLength,
  autocomplete,
}: TextInputProps): HTMLElement {
  const container = document.createElement('div');
  container.className = 'flex flex-col w-full justify-start gap-2';

  const inputLabel = document.createElement('label');
  inputLabel.htmlFor = id;
  inputLabel.textContent = label;
  inputLabel.className = 'font-heading text-md font-bold';

  const inputField = document.createElement('input');
  inputField.id = id;
  inputField.name = name;
  inputField.type = type ?? '';
  inputField.placeholder = placeholder ?? '';
  inputField.value = value ?? '';
  inputField.required = required ?? false;
  inputField.pattern = pattern ?? '';
  inputField.minLength = minLength ?? 0;
  inputField.maxLength = maxLength ?? 524288;
  inputField.title = title
    ? (TITLE_VARIANTS[title as TitleVariants] ?? (title as string))
    : '';
  inputField.autocomplete = autocomplete ?? 'on';
  inputField.className =
    'flex flex-row p-2 bg-white rounded-lg outline-[0.1875rem] outline-black focus:outline-[0.4rem] justify-start items-center font-body text-sm';

  const helperText = document.createElement('span');
  helperText.className = 'text-xs font-body text-orange-800 hidden';

  let hasInteracted = false;

  const updateValidationStyles = () => {
    if (inputField.validity.valid) {
      helperText.classList.add('hidden');
      inputField.classList.remove('outline-orange-600');
      inputField.classList.add('outline-green-600');
      inputField.classList.add('outline-[0.4rem]');
      inputField.classList.remove('outline-[0.1875rem]');
    } else {
      helperText.classList.remove('hidden');
      inputField.classList.remove('outline-green-600');
      inputField.classList.add('outline-orange-600');
      inputField.classList.add('outline-[0.4rem]');
      inputField.classList.remove('outline-[0.1875rem]');
    }
  };

  inputField.addEventListener('input', () => {
    hasInteracted = true;
    updateValidationStyles();
  });

  inputField.addEventListener('change', () => {
    hasInteracted = true;
    updateValidationStyles();
  });

  inputField.addEventListener('blur', () => {
    if (hasInteracted && !inputField.validity.valid) {
      helperText.classList.remove('hidden');
      helperText.textContent = inputField.title;
    }
  });

  container.appendChild(inputLabel);
  container.appendChild(inputField);
  container.appendChild(helperText);

  return container;
}
