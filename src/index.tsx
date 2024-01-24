import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';

const rootElement = document.querySelector('#root');
if (!rootElement) throw new Error('load root element Failed');
const root = createRoot(rootElement);
root.render(<App />);
