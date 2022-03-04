import './styles/GlobalStyle.module.css';
import Header from './components/Header/Header';
import Input from './components/Input/Input';

export default function App({ $target }) {
  const $container = document.createElement('div');
  $container.className = 'container';

  $target.appendChild($container);

  const header = new Header({ $container });
  const input = new Input({ $container });
}
