interface TextAreaProps {
  id: string;
  name?: string;
  label: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  title?: string;
}

export function TextArea({
  id,
  name,
  label,
  placeholder,
  value,
  required,
  minLength,
  maxLength,
  title,
}: TextAreaProps): HTMLElement {
  const container = document.createElement('div');
  container.className = 'flex flex-col w-full justify-start gap-2';

  const inputLabel = document.createElement('label');
  inputLabel.htmlFor = id;
  inputLabel.textContent = label;
  inputLabel.className = 'font-heading text-md font-bold';

  const inputField = document.createElement('textarea');
  inputField.id = id;
  inputField.name = name ?? '';
  inputField.placeholder = placeholder ?? '';
  inputField.value = value ?? '';
  inputField.required = required ?? false;
  inputField.minLength = minLength ?? 0;
  inputField.maxLength = maxLength ?? 524288;

  inputField.title = title ?? '';
  inputField.className =
    'flex flex-row p-2 bg-white rounded-lg outline-[0.1875rem] outline-black justify-start items-center font-body text-sm';

  container.appendChild(inputLabel);
  container.appendChild(inputField);

  return container;
}
