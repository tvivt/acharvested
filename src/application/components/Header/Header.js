import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { 
  createSign,
  fetchNonceByServerless,
  fetchVerifyResultByServerless,
  truncated
} from '../../shared';
import {
  getAddress,
  setAddress,
  getNonce,
  setNonce
} from '../../store/user';
import {
  getLearn,
  getCode,
  setPremiumDataSource
} from '../../store/premium';
import Logo from '../../../images/shuidao.png';
import MetamaskSVG from '../../../images/metamask-fox.svg';
import IMTokenPNG from '../../../images/imtoken.png';
import './Header.css';


// Verify
// Connect Wallet
// Unable Verify
// Learn
// Archived
// Potential
// Open Source
// Donate


const Header = (props) => {
  const dispatch = useDispatch();
  const address = useSelector(getAddress);
  const nonce = useSelector(getNonce);
  const learn = useSelector(getLearn);
  const code = useSelector(getCode);
  const timer = useRef(null);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    if (!nonce){
      fetchNonceByServerless().then((response) => {
        const { code, data } = response.data;
        if (code === 0){
          dispatch(setNonce(data.nonce));
        }
      });
    }
    
    if (typeof window.ethereum !== 'undefined'){
      if (!timer.current){
        timer.current = setInterval(() => {
          if (window.ethereum.selectedAddress){
            clearInterval(timer.current);
            dispatch(setAddress(window.ethereum.selectedAddress))
          }
        },1000);
      }
    }
  }, [dispatch, nonce]);

  const accessingAccount = () => {
    if (!address && typeof window.ethereum !== 'undefined'){
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        if (timer.current){
          clearInterval(timer.current);
        }
        dispatch(setAddress(accounts[0]));
      });
    } else {
      if (learn.length > 0){
        return;
      }
      createSign(nonce, address).then((sign) => {
        fetchVerifyResultByServerless(nonce, sign, address).then((response) => {
          const { code: remoteCode, data } = response.data;
          if (remoteCode === 0 || remoteCode === 10){
            dispatch(setPremiumDataSource({
              learn: data.learn,
              potential: data.potential,
              yuque: data.yuque,
              code: remoteCode
            }))
          } else {
            dispatch(setPremiumDataSource({
              learn: [],
              potential: [],
              yuque: [],
              code: 1
            }));
          }
          setDropdown(!dropdown);
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
  
  const walletIcon = !!window.imToken ? IMTokenPNG : MetamaskSVG;
  const walletText = address ? '验证' : '连接';
  const renderWalletContainer = () => {
    if (code === 0 || code === 10){
      return <div className='app-metamask-text'>{truncated(address)}</div>
    }
    if (code === 1){
      return <span className='text-red-700'>失败</span>;
    }
    return (
      <div className='app-metamask-text' onClick={accessingAccount}>
        {walletText}
      </div>
    )
  }

  return (
    <div className='app-header'>
      <div className={animatedClass} style={{position: 'fixed'}}>
        <div className='app-menu-top'>
          <div className='app-menu-container'>
            <Link to='/' className='app-menu-headline'>
              <img src={Logo} className='app-logo' alt=''/>
              <span className='app-name text-gray-600'>桑田</span>
            </Link>
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
              className='app-drop-link' 
              onClick={switchDropdown}
            >
              <Link to='/'>归档</Link>
            </div>
            <div
              onClick={switchDropdown} 
              className='app-drop-link'
            >
              <Link to='/learn'>学习</Link>
            </div>
            <div
              onClick={switchDropdown}
              className='app-drop-link'
            >
              <Link to='/potential'>潜在</Link>
            </div>
            <div
              onClick={switchDropdown}
            >
              <Link to='/about'>关于</Link>
            </div>
            <div className='app-metamask-container'>
              <img 
                src={walletIcon} 
                className='app-metamask' 
                  alt=''
              />
              {renderWalletContainer()}
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