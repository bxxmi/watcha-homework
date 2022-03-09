import styles from './Header.module.css';

export default function Header({ $target }) {
  const $header = document.createElement('header');
  const logoLink = document.createElement('a');

  logoLink.href = '/';

  $header.className = styles.header;
  logoLink.className = styles.logo;

  $header.appendChild(logoLink);
  $target.appendChild($header);
}
