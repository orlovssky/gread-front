import 'index.css';
import 'plugins/i18next';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

import App from 'app/App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
