import AutoCompleteItem from './AutoCompleteItem';
import styles from './AutoCompleteList.module.css';

export default function AutoCompleteList({ $main, result, inputText }) {
  const $list = document.createElement('ul');
  $list.className = styles.list_container;

  {
    result.length !== 0
      ? result.map((item) => {
          new AutoCompleteItem({ $list, item });
        })
      : ($list.innerHTML = `<li>검색하신 '${inputText}'는 찾지 못했어요🥲</li>`);
  }

  $main.appendChild($list);
}
