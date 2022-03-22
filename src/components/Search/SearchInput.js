import styles from './SearchInput.module.css';
import { requestKeyword } from '../../utils/api';
import { debounce } from '../../utils/debounce';
import { throttle } from '../../utils/throttle';

export default function SearchInput({ $target }) {
  const inputContainer = document.createElement('div');
  const resultContainer = document.createElement('div');
  const $input = document.createElement('input');
  const $button = document.createElement('button');

  inputContainer.className = styles.input_container;
  resultContainer.className = styles.list_container;

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

  $input.addEventListener('input', (e) => {
    const selectedKeyword = resultContainer.querySelector(`li.${styles.focus}`);
    handleRequest(e.target.value, selectedKeyword);
  });

  $input.addEventListener('keydown', (e) => {
    const selectedKeyword = resultContainer.querySelector(`li.${styles.focus}`);

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown')
      handleFocus(e.key, selectedKeyword);
  });

  $button.addEventListener('click', () => {
    $input.value = '';
    $button.style.display = 'none';
    resultContainer.style.display = 'none';
  });

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.render = () => {
    resultContainer.innerHTML = '';

    if (this.state.length > 0) {
      const $ul = document.createElement('ul');

      this.state.map((item) => {
        const $li = document.createElement('li');
        $li.innerHTML = item.text;

        $ul.appendChild($li);
        resultContainer.appendChild($ul);
      });
    } else {
      const $p = document.createElement('p');
      const keyword = $input.value;

      $p.innerHTML = `검색하신 <b class=${styles.bold}>'${keyword}'</b>를 찾지 못했어요 🥲`;

      resultContainer.appendChild($p);
    }
  };

  const handleRequest = debounce(async (keyword, element) => {
    if (keyword.length > 0 && !element) {
      const keywordList = await requestKeyword(keyword);

      this.setState(keywordList);
      this.render();

      $button.style.display = 'block';
    }

    if (keyword.length === 0) {
      resultContainer.innerHTML = '';
      $button.style.display = 'none';
    }
  }, 300);

  const handleFocus = throttle((arrowKey, element) => {
    const keywordList = resultContainer.querySelectorAll('li');
    const initIndex = arrowKey === 'ArrowUp' ? keywordList.length - 1 : 0;

    if (arrowKey === 'ArrowUp' || arrowKey === 'ArrowDown') {
      let currentTarget =
        element &&
        (arrowKey === 'ArrowUp'
          ? element.previousElementSibling
          : element.nextElementSibling);

      {
        currentTarget
          ? currentTarget
          : (currentTarget = keywordList.item(initIndex));
      }

      element && element.classList.remove(styles.focus);
      currentTarget.classList.add(styles.focus);
    }
  }, 100);
}
