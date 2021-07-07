import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import { fetchTotalByServerless } from './application/shared/apis';
import { setAllTotal } from './application/store/total';
import { setTokenlist } from './application/store/tokenlist';
import { ResponseCode } from './application/shared/status';
import MainMenu from './application/components/MainMenu/MainMenu';
import Archived from './pages/archived/Archived';
import Learn from './pages/learn/Learn';
import Potential from './pages/potential/Potential';
import Checks from './pages/checks/Checks';
import LogoPNG from './images/logo_shuidao.png';
import './App.css';

function App(){

  const dispatch = useDispatch();
  const lock = useRef(true);

  useEffect(() => {
    if (lock.current){
      lock.current = false;
      fetchTotalByServerless().then((response) => {
        const { code, data } = response.data;
        if (code === ResponseCode.ok){
          dispatch(setAllTotal({
            accounts: data.accounts,
            learns: data.learns,
            potentials: data.potentials,
            price: data.price
          }));
        }
      });

      axios({
        url: 'https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link'
      }).then((response) => {
        const tokenlist = response.data;
        const tokens = response.data.tokens;
        const buyTokens = ['dai'];
        const saved: any[] = [];
        for (const iterator of tokens) {
          const symbolKey =  iterator.symbol.toLocaleLowerCase();
          if (buyTokens.indexOf(symbolKey) > -1){
            saved.push(iterator);
            break;
          }
        }
        tokenlist.support = saved;
        dispatch(setTokenlist(tokenlist));
      });
    }
  },[dispatch]);
  
  return (
    <div className='app'>
      <Router>
        <div className='app-header'>
          <div className='app-header-container'>
            <div className='app-header-content'>
              <div className='app-header-cc'>
                <img src={LogoPNG} alt='' className='app-header-logo' />
                <MainMenu />
              </div>
            </div>
          </div>
        </div>
        <div className='app-content'>
          <div className='app-main'>
            <Route path='/' component={Archived} exact/>
            <Route path='/learn' component={Learn} />
            <Route path='/potential' component={Potential} />
            <Route path='/checks' component={Checks} />
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App;
