import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

window.addEventListener('error', (event) => {
  if (
    event.message &&
    (event.message.includes('ResizeObserver loop') ||
     event.message.includes('undelivered notifications'))
  ) {
    event.stopImmediatePropagation();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
