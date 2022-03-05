import AutoCompleteItem from './AutoCompleteItem';
import styles from './AutoCompleteList.module.css';

export default function AutoCompleteList({ $target, result, inputText }) {
  const $list = document.createElement('ul');
  $list.className = styles.list_container;

  {
    result.length !== 0
      ? result.map((item) => {
          new AutoCompleteItem({ $list, item });
        })
      : ($list.innerHTML = `<li>검색하신 '${inputText}'는 찾지 못했어요🥲</li>`);
  }

  const handleFocus = (e) => {
    let current;
    const first = $list.firstElementChild;
    const last = $list.lastElementChild;

    if (this.current) {
      this.current.style.backgroundColor = '#212327';
      if (e.key === 'ArrowDown') {
        this.current =
          this.current === last ? first : this.current.nextElementSibling;
      }
      if (e.key === 'ArrowUp') {
        this.current =
          this.current === first ? last : this.current.previousElementSibling;
      }
    } else {
      if (e.key === 'ArrowDown') this.current = first;
      if (e.key === 'ArrowUp') this.current = last;
    }
    this.current.style.backgroundColor = '#323436';
  };

  document.addEventListener('keydown', handleFocus);

  $target.appendChild($list);
}
