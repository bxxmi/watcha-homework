import styles from './SearchContent.module.css';
import SearchInput from './SearchInput';

export default function SearchContent({ $target }) {
  const $h1 = document.createElement('h1');
  const textContainer = document.createElement('div');

  $h1.innerText = '보고싶은 영화, 드라마, 예능, 다큐멘터리를 검색해보세요!';

  textContainer.className = styles.text_container;

  textContainer.appendChild($h1);
  $target.appendChild(textContainer);

  new SearchInput({ $target });
}
