import { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router,Route, Link } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import Logo from './images/shuidao.png';
import MetamaskLogo from './images/metamask-fox.svg';
import zhCN from 'antd/lib/locale/zh_CN';
import Home from './pages/home';
import './App.css';

const { Header, Footer, Content } = Layout;
const ethereum = window.ethereum;

ethereum.on('chainChanged', (chainId) => {
  // Handle the new chain.
  // Correctly handling chain changes can be complicated.
  // We recommend reloading the page unless you have good reason not to.
  window.location.reload();
});

function truncated(f){
  if (!f) return '';
  return f.substr(0,8) + '...' + f.substr(f.length - 8);
}

function App(){
  const timer = useRef(null);
  const [installed, setInstalled] = useState(false);
  const [address, setAddress] = useState('');
  useEffect(() => {
    if (typeof ethereum !== 'undefined') {
      setInstalled(true);
      if (!timer.current){
        timer.current = setInterval(() => {
          if (ethereum.selectedAddress && !address){
            clearInterval(timer.current);
            setAddress(ethereum.selectedAddress);
          }
        },1000);
      }
    }
  }, [installed,address]);

  const accessingAccount = () => {
    if (installed && !ethereum.selectedAddress){
      ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        setAddress(accounts[0]);
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
