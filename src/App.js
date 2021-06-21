import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import { fetchTotalByServerless } from './application/shared';
import { setAllTotal } from './application/store/total'
import Archived from './pages/archived';
import Learn from './pages/learn';
import Potential from './pages/potential';
import About from './pages/about';
import Header from './application/components/Header/Header';
import './App.css';
import { useRef } from 'react';

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
          }))
        }
      })
    }
  },[dispatch])

  return (
    <Router>
      <Header/>
      <Route path='/' component={Archived} exact/>
      <Route path='/learn' component={Learn} />
      <Route path='/potential' component={Potential}/>
      <Route path='/about' component={About} />
    </Router>
  )
}

export default App;
