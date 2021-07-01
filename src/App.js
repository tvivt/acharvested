import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { fetchTotalByServerless } from './application/shared/apis';
import { setAllTotal, getAccountTotal, getPriceTotal } from './application/store/total';
import { setTokenlist } from './application/store/tokenlist';
import { ResponseCode } from './application/shared/status';
import MainMenu from './application/components/MainMenu/MainMenu';
import Airdrop from './pages/airdrop';
import Automatic from './pages/automatic';
import Plugins from './pages/plugins';
import pkg from '../package.json';
import './App.css';

const version = `v${pkg.version}`;

function App(){

  const dispatch = useDispatch();
  const lock = useRef(true);
  const accountTotal = useSelector(getAccountTotal);
  const priceTotal = useSelector(getPriceTotal);

  useEffect(() => {
    if (lock.current){
      lock.current = false;
      fetchTotalByServerless().then((response) => {
        const { code, data } = response.data;
        if (code === ResponseCode.ok){
          dispatch(setAllTotal({
            accountTotal: data.account_total,
            learnTotal: data.learn_total,
            potentialTotal: data.potential_total,
            priceTotal: data.price_total
          }));
        }
      });

      axios({
        url: 'https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link'
      }).then((response) => {
        const tokenlist = response.data;
        const tokens = response.data.tokens;
        const buyTokens = ['dai'];
        const saved = [];
        tokens.forEach((v) => {
          const symbolKey =  v.symbol.toLocaleLowerCase();
          if (buyTokens.indexOf(symbolKey) > -1){
            saved.push(v);
          }
        });
        tokenlist.support = saved;
        dispatch(setTokenlist(tokenlist));
      });
    }
  },[dispatch]);
  
  return (
    <div className='app'>
      <Router>
        <div className='app-container'>
            <MainMenu />
            <div className='app-content'>
              <Route path='/' component={Airdrop} exact/>
              <Route path='/automatic' component={Automatic} />
              <Route path='/plugins' component={Plugins} />
            </div>
        </div>
        <div className='app-footer'>
          <Link to='/'>
            acharvested.me
          </Link>
          <span className='app-footer-divide'>-</span>
          <a 
            href='https://github.com/icepy/acharvested/issues/2'
            target='_blank'
            rel="noreferrer"
          >
            关于
          </a>
          <span className='app-footer-divide'>-</span>
          <a 
            href='https://github.com/icepy/acharvested'
            target='_blank'
            rel="noreferrer"
          >
            源代码({version})
          </a>
          <span className='app-footer-divide'>-</span>
          <span>订阅用户({accountTotal})</span>
          <span className='app-footer-divide'>-</span>
          <span>空投价值(${parseInt(priceTotal)})</span>
        </div>
      </Router>
    </div>
  )
}

export default App;
