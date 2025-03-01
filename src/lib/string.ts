export function getLongestString(strings: string[]) {
  if (strings.length === 0) return '';
  return strings.reduce((acc, str) => (str.length > acc.length ? str : acc), '');
}
