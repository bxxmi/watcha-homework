import styles from './Header.module.css';

export default function Header({ $target }) {
  const logoLink = document.createElement('a');
  logoLink.className = styles.logo;
  logoLink.href = '/';

  $target.appendChild(logoLink);
}
