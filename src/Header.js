import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { createSign, getNonce, verify } from './shared'
import Logo from './images/shuidao.png';
import MetamaskSVG from './images/metamask-fox.svg';
import './Header.css';

const donateAddress = '0x1A56d61142AC107dbC46f1c15a559906D84eEd59';
const donateEtherscan = 'https://cn.etherscan.com/address/0x1A56d61142AC107dbC46f1c15a559906D84eEd59';

function truncated(f){
  if (!f) return '';
  return f.substr(0,5) + '...' + f.substr(f.length - 5);
}

const Header = (props) => {
  const { callbackToRootComponent, address, learn, potential } = props;
  const timer = useRef(null);
  const [dropdown, setDropdown] = useState(false);
  const [nonce, setNonce] = useState('');

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
            callbackToRootComponent({
              address: window.ethereum.selectedAddress
            });
          }
        },1000);
      }
    }
  }, [callbackToRootComponent]);

  const accessingAccount = () => {
    if (!address && typeof window.ethereum !== 'undefined'){
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        if (timer.current){
          clearInterval(timer.current);
        }
        callbackToRootComponent({
          address: accounts[0]
        });
      });
    } else {
      if (learn.length > 0 || potential.length > 0){
        return;
      }
      createSign(nonce, address).then((sign) => {
        verify(nonce, sign, address).then((response) => {
          const { code, data } = response.data;
          if (code === 0 || code === 10){
            callbackToRootComponent({
              learn: data.learn,
              potential: data.potential
            });
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

  // const switchLanguage = (checked, event) => {
  //   if (!checked){
  //     callbackToRootComponent({
  //       language: zh_CN
  //     });
  //   }
  //   if (checked){
  //     callbackToRootComponent({
  //       language: en_US
  //     });
  //   }
  // }

  const switchDropdown = () => {
    setDropdown(!dropdown);
  }
  
  const animatedClass = classnames({
    'app-menu-content animated': !dropdown,
    'app-menu-content open animated': dropdown 
  });

  const metamaskText = address ? 'Verify' : 'Connect Wallet';
  const renderMetamaskContainer = learn.length > 0 ? (
    <div className='app-metamask-text'>{truncated(address)}</div>
  ) : (
    <div className='app-metamask-text' onClick={accessingAccount}>
      {metamaskText}
    </div>
  );

  return (
    <div className='app-header'>
      <div className={animatedClass} style={{position: 'fixed'}}>
        <div className='app-menu-top'>
          <div className='app-menu-container'>
            <a href='/' className='app-menu-headline'>
              <img src={Logo} className='app-logo' alt=''/>
              <span className='app-name'>ACHARVESTED</span>
            </a>
            <div className='app-menu-buttons'>
              <button className='app-menu-button' onClick={switchDropdown}>
                <svg t="1623746491501" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1847" width="30" height="30"><path d="M685.909333 85.333333h144.426667A108.757333 108.757333 0 0 1 938.666667 194.56v145.706667a108.757333 108.757333 0 0 1-108.330667 109.226666h-144.426667a108.757333 108.757333 0 0 1-108.330666-109.226666V194.56A108.757333 108.757333 0 0 1 685.909333 85.333333" fill="#8a8a8a" opacity=".4" p-id="1848"></path><path d="M338.090667 574.549333a108.757333 108.757333 0 0 1 108.330666 109.226667v145.664A108.8 108.8 0 0 1 338.090667 938.666667H193.706667A108.8 108.8 0 0 1 85.333333 829.44v-145.706667a108.757333 108.757333 0 0 1 108.330667-109.226666h144.426667z m492.245333 0A108.757333 108.757333 0 0 1 938.666667 683.776v145.664A108.8 108.8 0 0 1 830.336 938.666667h-144.426667a108.8 108.8 0 0 1-108.330666-109.226667v-145.706667a108.757333 108.757333 0 0 1 108.330666-109.226666h144.426667zM338.090667 85.333333a108.757333 108.757333 0 0 1 108.330666 109.226667v145.706667a108.757333 108.757333 0 0 1-108.330666 109.226666H193.706667A108.757333 108.757333 0 0 1 85.333333 340.224V194.56A108.757333 108.757333 0 0 1 193.664 85.333333h144.426667z" fill="#8a8a8a" p-id="1849"></path></svg>
              </button>
            </div>
          </div>
        </div>
        <div className='app-drop-down'>
          <div className='app-drop-container'>
            <div
              onClick={switchDropdown} 
              className='app-drop-link'
            >
              <Link to='/'>Home</Link>
            </div>
            <div
              onClick={switchDropdown} 
              className='app-drop-link'
            >
                <Link to='/'>Learn</Link>
            </div>
            <div
              onClick={switchDropdown}
              className='app-drop-link'
            >
              <Link to='/'>Potential</Link>
            </div>
            <div className='app-drop-link' onClick={switchDropdown}><Link to='/archived'>Archived</Link></div>
            <div className='app-donate'>
              Donate|捐赠（ethereum | binance）
              <a 
                target='_blank'
                rel="noreferrer"
                href={donateEtherscan}>
                {donateAddress}
              </a>
            </div>
            <div className='app-metamask-container'>
              <img 
                src={MetamaskSVG} 
                className='app-metamask' 
                  alt=''
              />
              {renderMetamaskContainer}
            </div>
          </div>
        </div>
        <div className='app-back-drop'></div>
      </div>
      <div className='app-eplacement'></div>
    </div>
  )
}

export default Header;