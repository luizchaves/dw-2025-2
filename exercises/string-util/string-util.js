/**
 * text: string
 * action: lowercase, uppercase, camelcase, snakecase, reverse,
 *         countchar, countword, countline
 */
export function formatter(text, action) {
  switch (action) {
    case 'lowercase':
      return text.toLowerCase();
    case 'uppercase':
      return text.toUpperCase();
    case 'camelcase':
      const camelCase = (word) => word[0].toUpperCase() + word.slice(1).toLowerCase();
      let words = text.split(/\s/g);
      return words.map(camelCase).join(' ');
    case 'snakecase':
      // words = text.split(/\s/g);
      // return words.join('_');
      return text.replace(/\s/g, '_');
    case 'reverse':
      return text.split('').reverse().join('');
    case 'countchar':
      return text.length;
    case 'countword':
      return text.split(/\s/g).length;
    case 'countline':
      return text.split('\n').length;
    default:
      return text;
  }
}
