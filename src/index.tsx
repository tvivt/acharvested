import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ethers } from 'ethers';
import Web3Modal from "web3modal";
import store from './application/store';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

declare global{
  interface Window{
    imToken: any;
    provider: any;
    web3Provider: ethers.providers.Web3Provider;
    web3Modal: Web3Modal;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
