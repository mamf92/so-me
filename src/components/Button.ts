interface ButtonProps {
  label: string;
  onClick?: string; // Changed to string to pass navigation info
  id?: string; // Added ID for targeting
  // ...other props
}

export function Button({ label, onClick, id }: ButtonProps) {
  const buttonId = id ? `id="${id}"` : '';
  const clickAttr = onClick ? `data-action="${onClick}"` : '';

  return `
    <button 
      ${buttonId}
      ${clickAttr}
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      ${label}
    </button>
  `;
}
