import styles from './SearchInput.module.css';
import { requestKeyword } from '../../utils/api';
import { debounce } from '../../utils/debounce';

export default function SearchInput({ $target }) {
  const inputContainer = document.createElement('div');
  const resultContainer = document.createElement('div');
  const $input = document.createElement('input');
  const $button = document.createElement('button');

  resultContainer.className = styles.list_container;
  inputContainer.className = styles.input_container;

  $input.type = 'text';
  $input.placeholder = '제목, 감독, 배우로 검색';
  $button.innerText = '지우기';
  $button.style.display = 'none';

  // 로직 시작
  $input.addEventListener('keyup', async (e) => {
    const selectedKeyword = resultContainer.querySelector(
      `li.${styles.selected}`,
    );

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      handleFocus(e.key, selectedKeyword);
    } else {
      handleRequest(e.target.value, selectedKeyword);
    }
  });

  // 데이터 요청 로직
  const handleRequest = debounce(async (keyword, element) => {
    if (keyword.length > 0 && !element) {
      const keywordList = await requestKeyword(keyword);
      const $ul = document.createElement('ul');

      resultContainer.innerHTML = '';

      keywordList.map((item) => {
        const $li = document.createElement('li');
        $li.innerText = `${item.text}`;
        $ul.appendChild($li);
      });

      resultContainer.style.display = 'block';
      resultContainer.appendChild($ul);

      $button.style.display = 'block';
    }

    if (keyword.length === 0) {
      resultContainer.innerHTML = '';
      $button.style.display = 'none';
    }
  }, 300);

  // 포커스 로직
  const handleFocus = (arrowKey, element) => {
    const keywordList = resultContainer.querySelectorAll('li');

    if (
      (arrowKey === 'ArrowUp' || arrowKey === 'ArrowDown') &&
      resultContainer.style.display === 'block'
    ) {
      let target;
      const initIndex = arrowKey === 'ArrowUp' ? keywordList.length - 1 : 0;

      const siblingElement =
        element &&
        (arrowKey === 'ArrowUp'
          ? element.previousElementSibling
          : element.nextElementSibling);

      if (siblingElement) {
        target = siblingElement;
      } else {
        target = keywordList.item(initIndex);
      }
      element && element.classList.remove(styles.selected);
      target.classList.add(styles.selected);

      $input.value = target.textContent;
    }
  };

  // 포커스 없어질 때
  $input.addEventListener('blur', () => {
    resultContainer.style.display = 'none';
  });

  // 포커스 생길 때
  $input.addEventListener('focus', () => {
    resultContainer.style.display = 'block';
  });

  $button.addEventListener('click', () => {
    $input.value = '';
    resultContainer.innerHTML = '';

    $button.style.display = 'none';
  });

  inputContainer.appendChild($button);
  inputContainer.appendChild($input);
  $target.appendChild(inputContainer);
  $target.appendChild(resultContainer);
}
