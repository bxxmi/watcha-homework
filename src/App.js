import './styles/GlobalStyle.module.css';
import Header from './components/Header/Header';
import SearchContent from './components/Search/SearchContent';

export default function App({ $target }) {
  const $container = document.createElement('div');
  $container.className = 'container';

  $target.appendChild($container);

  const header = new Header({ $container });
  const input = new SearchContent({ $container });
}
