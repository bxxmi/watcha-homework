import styles from './SearchInput.module.css';
import { requestKeyword } from '../../utils/api';
import { debounce } from '../../utils/debounce';
import AutoCompleteList from '../AutoCompleteList/AutoCompleteList';

export default function SearchInput({ $target }) {
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

    const keywordResult = async () => {
      const result = await requestKeyword(inputText);
      new AutoCompleteList({ $target, result, inputText });
    };

    keywordResult();
  };

  const handleRemove = () => {
    $input.value = '';
  };

  $input.addEventListener('input', debounce(handleSearch, 400));
  $button.addEventListener('click', handleRemove);

  $inputContainer.appendChild($input);
  $target.appendChild($inputContainer);
}
