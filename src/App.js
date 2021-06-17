import { useEffect, useState } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import { getTotal } from './shared';
import Archived from './pages/archived';
import Learn from './pages/learn';
import Potential from './pages/potential';
import Header from './Header';
import './App.css';

const zh_CN = 'zh_CN';
// const en_US = 'en_US';

function WrappedPageComponent(Component, depend){
  return (props) => {
    const newProps = {
      ...props,
      ...depend
    }
    return <Component {...newProps}/>
  }
}

// code 99 初始化状态
// code 0 成功
// code 1 不在许可名单内
// code 10 特殊状态

function App(){
  const [code, setCode] = useState(99)
  const [language, setLanguage] = useState(zh_CN)
  const [address, setAddress] = useState('');
  const [learn, setLearn] = useState([]);
  const [potential, setPotential] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (total === 0){
      getTotal().then((response) => {
        const { code: remoteCode, data } = response.data;
        if (remoteCode === 0){
          setTotal(data.total)
        }
      });
    }
  },[total])

  const depend = {
    language,
    address,
    learn,
    potential,
    code,
    total
  }
  return (
    <Router>
      <Header
        {...depend}
        callbackToRootComponent={(headerState) => {
          if (typeof headerState.code === 'number' && code !== headerState.code){
            setCode(headerState.code);
          }
          if (headerState.language && language !== headerState.language){
            setLanguage(headerState.language);
          }
          if (headerState.address && address !== headerState.address){
            setAddress(headerState.address);
          }
          if (headerState.learn && headerState.learn.length > 0){
            setLearn(headerState.learn);
          }
          if (headerState.potential && headerState.potential.length > 0){
            setPotential(headerState.potential);
          }
        }}
      />
      
      <Route path='/' component={WrappedPageComponent(Archived, depend)} exact/>
      <Route path='/learn' component={WrappedPageComponent(Learn, depend)} />
      <Route path='/potential' component={WrappedPageComponent(Potential, depend)}/>
    </Router>
  )
}

export default App;
