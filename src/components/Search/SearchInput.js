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

  $input.addEventListener('keyup', (e) => handleKeyEvent(e));

  const handleKeyEvent = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      handleFocus(e.key);
    } else {
      handleInput(e.target.value);
    }
  };

  const handleInput = (keyword) => {
    handleRequest(keyword);

    $inputContainer.appendChild($button);

    $button.addEventListener('click', () => {
      $input.value = '';
      keywordList.innerHTML = '';
    });
  };

  // fetch 요청
  const handleRequest = debounce(async (keyword) => {
    console.log(keyword);
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

  $input.addEventListener('blur', () => {
    $target.removeChild(keywordList);
  });

  $input.addEventListener('focus', () => {
    $target.appendChild(keywordList);
  });

  // const handleFocus = (e) => {
  //   const first = keywordList.firstElementChild;
  //   const last = keywordList.lastElementChild;

  //   if (!this.current) {
  //     if (e.key === 'ArrowDown') {
  //       this.current = first;
  //     }
  //   }
  //   this.current.className = styles.focus;
  // };

  $inputContainer.appendChild($input);
  $target.appendChild($inputContainer);
}
