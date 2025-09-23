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
}: TextInputProps): HTMLElement {
  const container = document.createElement('div');
  container.className = 'flex flex-col w-full justify-start gap-2';

  const inputLabel = document.createElement('label');
  inputLabel.htmlFor = id;
  inputLabel.textContent = label;
  inputLabel.className = 'font-heading text-lg font-bold';

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
  inputField.className =
    'flex flex-row px-4 py-3 bg-white rounded-lg outline-[0.1875rem] outline-black justify-start items-center font-body text-lg';

  container.appendChild(inputLabel);
  container.appendChild(inputField);

  return container;
}
