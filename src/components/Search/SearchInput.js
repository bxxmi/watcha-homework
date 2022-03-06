import styles from './SearchInput.module.css';
import { requestKeyword } from '../../utils/api';
import { debounce } from '../../utils/debounce';

export default function SearchInput({ $target }) {
  const $inputContainer = document.createElement('div');
  const $input = document.createElement('input');
  const $button = document.createElement('button');
  const keywordList = document.createElement('ul');

  keywordList.className = styles.list_container;
  $inputContainer.className = styles.input_container;

  $input.type = 'text';
  $input.placeholder = '제목, 감독, 배우로 검색';
  $button.innerText = '지우기';

  $input.addEventListener('keyup', (e) => handleInput(e));
  $input.addEventListener('keydown', (e) => handleFocus(e));

  const handleInput = (e) => {
    if (
      e.key === 'ArrowDown' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'CapsLock'
    ) {
      return;
    } else {
      const inputText = e.target.value;
      handleRequest(inputText);

      $inputContainer.appendChild($button);

      $button.addEventListener('click', () => {
        $input.value = '';
        keywordList.innerHTML = '';
      });
    }
  };

  // fetch 요청
  const handleRequest = debounce(async (keyword) => {
    if (!keyword) {
      $inputContainer.removeChild($button);
      keywordList.innerHTML = '';
      return;
    }

    const result = await requestKeyword(keyword);
    handleAutoComplete(result);
  }, 400);

  // 추천 검색어 함수
  const handleAutoComplete = (list) => {
    keywordList.innerHTML = '';

    list.map((item) => {
      const keywordItem = document.createElement('li');
      keywordItem.innerHTML = item.text;
      keywordList.appendChild(keywordItem);
    });
    $target.appendChild(keywordList);
  };

  const handleFocus = (e) => {};

  $input.addEventListener('blur', () => {
    $target.removeChild(keywordList);
  });

  $input.addEventListener('focus', () => {
    $target.appendChild(keywordList);
  });

  $inputContainer.appendChild($input);
  $target.appendChild($inputContainer);
}
