import styles from './SearchInput.module.css';
import { requestKeyword } from '../../utils/api';

let TIMER;

export default function SearchInput({ $main }) {
  const $inputContainer = document.createElement('div');
  const $input = document.createElement('input');
  const $button = document.createElement('button');

  $inputContainer.className = styles.input_container;

  $input.type = 'text';
  $input.placeholder = '제목, 감독, 배우로 검색';
  $button.innerText = '지우기';

  const handleSearch = (e) => {
    const inputText = e.target.value;
    $inputContainer.appendChild($button);

    if (inputText.length === 0) {
      $inputContainer.removeChild($button);
      return;
    }

    requestKeyword(inputText);
  };

  const handleRemove = () => {
    $input.value = '';
  };

  $input.addEventListener('input', (e) => {
    if (TIMER) {
      clearTimeout(TIMER);
    }

    TIMER = setTimeout(() => {
      handleSearch(e);
    }, 400);
  });
  $button.addEventListener('click', handleRemove);

  $inputContainer.appendChild($input);
  $main.appendChild($inputContainer);
}
