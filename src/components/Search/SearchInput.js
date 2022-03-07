import styles from './SearchInput.module.css';
import { requestKeyword } from '../../utils/api';
import { debounce } from '../../utils/debounce';

export default function SearchInput({ $target }) {
  const $inputContainer = document.createElement('div');
  const $ResultContainer = document.createElement('div');
  const $input = document.createElement('input');

  // div 클래스명 지정
  $ResultContainer.className = styles.list_container;
  $inputContainer.className = styles.input_container;

  // 인풋 태그, 버튼 설정
  $input.type = 'text';
  $input.placeholder = '제목, 감독, 배우로 검색';

  // 로직 시작
  $input.addEventListener('keyup', async (e) => {
    const selectedKeyword = $ResultContainer.querySelector(
      `li.${styles.selected}`,
    );

    if (e.target.value.length > 0 && !selectedKeyword) {
      const list = await requestKeyword(e.target.value);
      console.log(list);

      $ResultContainer.innerHTML = '';

      const $ul = document.createElement('ul');

      list.map((item) => {
        const $li = document.createElement('li');
        $li.textContent = `${item.text}`;
        $ul.appendChild($li);
      });
      $ResultContainer.appendChild($ul);
      $ResultContainer.style.display = 'block';
    }

    if (e.target.value.length === 0) {
      $ResultContainer.innerHTML = '';
    }

    const keywordList = $ResultContainer.querySelectorAll('li');

    if (
      (e.key === 'ArrowUp' || e.key === 'ArrowDown') &&
      $ResultContainer.style.display === 'block'
    ) {
      let target;

      const initIndex = e.key === 'ArrowUp' ? keywordList.length - 1 : 0;

      const sibling =
        selectedKeyword &&
        (e.key === 'ArrowUp'
          ? selectedKeyword.previousElementSibling
          : selectedKeyword.nextElementSibling);

      if (sibling) {
        target = sibling;
      } else {
        target = keywordList.item(initIndex);
      }
      selectedKeyword && selectedKeyword.classList.remove(styles.selected);
      target.classList.add(styles.selected);

      $input.value = target.textContent;
    }
  });

  $inputContainer.appendChild($input);
  $target.appendChild($inputContainer);
  $target.appendChild($ResultContainer);
}
