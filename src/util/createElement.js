export function createElement(elementName) {
  const $element = document.createElement(elementName);
  $element.classList = `${elementName}`;

  return $element;
}
