export function Button(label: string) {
  return `
    <button class="px-4 bg-blue-600 hover:bg-blue-700 py-2 rounded-md text-white mt-6">
      ${label}
    </button>
  `;
}
