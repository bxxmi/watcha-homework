import styles from './SearchInput.module.css';

export default function SearchInput({ $main }) {
  const $inputContainer = document.createElement('div');
  const $input = document.createElement('input');
  const $button = document.createElement('button');

  $inputContainer.className = styles.input_container;

  $input.type = 'text';
  $input.placeholder = '제목, 감독, 배우로 검색';
  $button.innerText = '지우기';

  $inputContainer.appendChild($input);
  $inputContainer.appendChild($button);
  $main.appendChild($inputContainer);
}
