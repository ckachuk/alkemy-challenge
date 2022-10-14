import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterSwitch from './RouterSwitch';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterSwitch />
  </React.StrictMode>
);
