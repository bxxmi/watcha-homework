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
  $button.innerText = 'X';
  $button.style.display = 'none';

  inputContainer.appendChild($button);
  inputContainer.appendChild($input);
  $target.appendChild(inputContainer);
  $target.appendChild(resultContainer);

  $input.addEventListener('blur', () => {
    resultContainer.style.display = 'none';
  });

  $input.addEventListener('focus', () => {
    resultContainer.style.display = 'block';
  });

  $button.addEventListener('click', () => {
    $input.value = '';
    $button.style.display = 'none';
    resultContainer.innerHTML = '';
  });

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

  const handleRequest = debounce(async (keyword, element) => {
    if (keyword.length > 0 && !element) {
      const keywordList = await requestKeyword(keyword);
      const $ul = document.createElement('ul');

      resultContainer.innerHTML = '';

      if (keywordList.length === 0) {
        $ul.style.display = 'none';

        const $p = document.createElement('p');
        $p.innerHTML = `검색하신 <b class=${styles.bold}>'${keyword}'</b>를 찾지 못했어요 🥲`;
        resultContainer.appendChild($p);
      } else {
        keywordList.map((item) => {
          const $li = document.createElement('li');
          $li.innerText = `${item.text}`;
          $ul.appendChild($li);
        });
      }

      resultContainer.style.display = 'block';
      resultContainer.appendChild($ul);

      $button.style.display = 'block';
    }

    if (keyword.length === 0) {
      resultContainer.innerHTML = '';
      $button.style.display = 'none';
    }
  }, 300);

  const handleFocus = (arrowKey, element) => {
    const keywordList = resultContainer.querySelectorAll('li');

    if (
      (arrowKey === 'ArrowUp' || arrowKey === 'ArrowDown') &&
      resultContainer.style.display === 'block'
    ) {
      let currentTarget;
      const initIndex = arrowKey === 'ArrowUp' ? keywordList.length - 1 : 0;

      const siblingElement =
        element &&
        (arrowKey === 'ArrowUp'
          ? element.previousElementSibling
          : element.nextElementSibling);

      {
        siblingElement
          ? (currentTarget = siblingElement)
          : (currentTarget = keywordList.item(initIndex));
      }

      element && element.classList.remove(styles.selected);
      currentTarget.classList.add(styles.selected);

      $input.value = currentTarget.textContent;
    }
  };
}
