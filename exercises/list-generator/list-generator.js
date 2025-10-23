export function createList(number, text = 'Text') {
  let list = `<ul>\n`;

  for (let item = 1; item <= number; item++) {
    list += `  <li>${text} ${item}</li>\n`;
  }

  list += `</ul>`;

  return list;
}
