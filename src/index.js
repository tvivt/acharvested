import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { metamaskUrl, isMobile } from './shared'
// import reportWebVitals from './reportWebVitals';

// if (typeof window.ethereum !== 'undefined' && !isMobile){

// } else {
  // alert(`it's used to desktop and go to ${metamaskUrl} install MetaMask`)
// }


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
