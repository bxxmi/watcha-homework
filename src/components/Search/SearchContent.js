import styles from './SearchContent.module.css';
import SearchInput from './SearchInput';

export default function SearchContent({ $container }) {
  const $main = document.createElement('main');
  const $textContainer = document.createElement('div');
  const $h1 = document.createElement('h1');

  $h1.innerText = '보고싶은 영화, 드라마, 예능, 다큐멘터리를 검색해보세요!';

  $textContainer.className = styles.text_container;

  $textContainer.appendChild($h1);
  $main.appendChild($textContainer);
  $container.appendChild($main);

  const input = new SearchInput({ $main });
}
