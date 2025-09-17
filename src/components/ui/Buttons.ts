type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonBaseProps {
  label: string;
  size?: ButtonSize;
  id?: string;
  fill?: boolean;
}

interface ButtonProps extends ButtonBaseProps {
  onClick?: (event: MouseEvent) => void;
}

interface LinkButtonProps extends ButtonBaseProps {
  href: string;
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  small: 'text-4xl p-2',
  medium: 'text-4xl px-4 py-3',
  large: 'text-5xl p-3',
};

const BASE = 'font-extrabold rounded-lg outline outline-8 outline-black';

export function buttonClassNames(
  size: ButtonSize = 'medium',
  fill: boolean = false
): string {
  const variant = fill
    ? 'bg-black text-white'
    : 'bg-white text-black hover:bg-black hover:text-white';
  return `${BASE} ${variant} ${SIZE_CLASSES[size]}`;
}

export function Button({
  label,
  size = 'medium',
  id,
  fill = false,
  onClick,
}: ButtonProps): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = buttonClassNames(size, fill);
  if (id) btn.id = id;
  btn.textContent = label;
  if (onClick) btn.addEventListener('click', onClick);
  return btn;
}

export function LinkButton({
  label,
  size = 'medium',
  id,
  fill = false,
  href,
}: LinkButtonProps): HTMLAnchorElement {
  const link = document.createElement('a');
  link.className = buttonClassNames(size, fill);
  if (id) link.id = id;
  link.textContent = label;
  link.href = href;
  return link;
}
