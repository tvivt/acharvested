import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { fetchTotalByServerless } from './application/shared/apis';
import { setAllTotal } from './application/store/total'
import Airdrop from './pages/airdrop';
import MainMenu from './application/components/MainMenu/MainMenu';
import './App.css';

// code 99 初始化状态
// code 0 成功
// code 1 不在许可名单内
// code 10 特殊状态

function App(){

  const dispatch = useDispatch();
  const lock = useRef(true);

  useEffect(() => {
    if (lock.current){
      lock.current = false;
      fetchTotalByServerless().then((response) => {
        const { code: remoteCode, data } = response.data;
        if (remoteCode === 0){
          dispatch(setAllTotal({
            accountTotal: data.account_total,
            learnTotal: data.learn_total,
            potentialTotal: data.potential_total,
            priceTotal: data.price_total
          }));
        }
      });
    }
  },[dispatch]);
  
  return (
    <div className='app'>
      <div className='app-container'>
      <Router>
        <MainMenu />
        <div className='app-content'>
          <Route path='/' component={Airdrop} exact/>
        </div>
      </Router>
      </div>
    </div>
  )
}

export default App;
