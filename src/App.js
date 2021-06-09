import { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router,Route, Link } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import { createSign, getNonce, verify } from './shared'
import Logo from './images/shuidao.png';
import MetamaskLogo from './images/metamask-fox.svg';
import zhCN from 'antd/lib/locale/zh_CN';
import Home from './pages/home';
import './App.css';

const { Header, Footer, Content } = Layout;

function truncated(f){
  if (!f) return '';
  return f.substr(0,5) + '...' + f.substr(f.length - 5);
}

function App(){
  const timer = useRef(null);
  const [nonce, setNonce] = useState('');
  const [address, setAddress] = useState('');
  const [learn, setLearn] = useState([]);
  const [potential, setPotential] = useState([]);

  useEffect(() => {

    getNonce().then((response) => {
      const { code, data } = response.data;
      if (code === 0){
        setNonce(data.nonce);
      }
    });

    if (typeof window.ethereum !== 'undefined'){
      if (!timer.current){
        timer.current = setInterval(() => {
          if (window.ethereum.selectedAddress){
            clearInterval(timer.current);
            setAddress(window.ethereum.selectedAddress);
          }
        },1000);
      }
    }
  }, []);

  const accessingAccount = () => {
    if (!address && typeof window.ethereum !== 'undefined'){
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        if (timer.current){
          clearInterval(timer.current);
        }
        setAddress(accounts[0]);
      });
    } else {
      if (learn.length > 0 || potential.length > 0){
        return;
      }
      createSign(nonce, address).then((sign) => {
        verify(nonce, sign, address).then((response) => {
          const { code, data } = response.data;
          if (code === 0){
            setLearn([123]);
            setPotential(data.potential);
            alert('验证钱包所有权并且在许可名单内');
          } else {
            alert('已验证钱包所有权但未在许可名单内')
          }
        })
      }).catch(() => {
        window.location.reload();
      });
    }
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Layout className='app-layout'>
          <Header className='app-header-background'>
            <img src={Logo} className='app-header-logo' alt=''/>
            <div>ACHARVESTED</div>
            <div className='app-navs'>
              <Link to="/">Home</Link>
              <Link to="/">Learn</Link>
              <Link to="/">Potential</Link>
              <Link to="/">Archived</Link>
              <img src={MetamaskLogo} className='app-header-metamask' onClick={accessingAccount} alt=''/>
              <div>{truncated(address)}</div>
            </div>
          </Header>
          <Content>
            <Route path='/' component={Home}></Route>
          </Content>
          <Footer></Footer>
        </Layout>
      </Router>
    </ConfigProvider>
  )
}

export default App;
