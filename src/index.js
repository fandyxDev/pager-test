import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';

const rootElement = document.getElementById("root");

export function renderToApp(element) {
  if (element) {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      element
    );}
}

renderToApp(rootElement);