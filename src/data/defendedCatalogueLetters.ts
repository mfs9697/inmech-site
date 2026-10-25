export const ukrainianCatalogueLetters = [
  'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О',
  'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я'
] as const;

export function catalogueLetterSlug(letter: string): string {
  const point = letter.codePointAt(0);
  if (point === undefined || [...letter].length !== 1) {
    throw new Error('Expected one catalog initial, got ' + letter);
  }
  return point.toString(16);
}
