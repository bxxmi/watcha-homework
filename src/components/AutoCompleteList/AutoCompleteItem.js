export default function AutoCompleteItem({ $list, item }) {
  const $item = document.createElement('li');

  $item.innerText = `${item.text}`;

  $list.appendChild($item);
}
