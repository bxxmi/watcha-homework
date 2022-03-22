import './styles/GlobalStyle.module.css';
import Header from './components/Header/Header';
import SearchContent from './components/Search/SearchContent';

export default function App({ $target }) {
  const $header = document.createElement('header');
  const $main = document.createElement('main');

  $target.append($header, $main);

  Header({ $target: $header });
  SearchContent({ $target: $main });
}
