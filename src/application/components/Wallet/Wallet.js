import { useState, useRef, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getAddress, setAddress, getNonce, setNonce, setSign, getSign } from '../../store/user';
import { setPremiumDataSource } from '../../store/premium';
import { INFURA_ID } from '../../../constants';
import { 
  truncated,
  setWeb3Modal, 
  setProvider, 
  createSign, 
  getEthers, 
  setEthers,
  logoutOfWeb3Modal
} from '../../shared';
import { fetchNonceByServerless, fetchVerifyResultByServerless } from '../../shared/apis';
import status from '../../shared/status';
import './index.css';

const Ethers = require('ethers');

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID
    }
  }
};

const web3Modal = new Web3Modal({
  theme: {
    background: "#001529",
    main: "rgba(255, 255, 255, 0.65)",
    secondary: "rgb(136, 136, 136)",
    border: "rgba(195, 195, 195, 0.14)",
    hover: "#001529"
  },
  network: "mainnet",
  cacheProvider: true,
  providerOptions
});

const Wallet = () => {

  const dispatch = useDispatch();
  const timer = useRef(null);
  const nonceLock = useRef(false);
  const ethersRef = useRef(getEthers());
  const nonce = useSelector(getNonce);
  const sign = useSelector(getSign);
  const address = useSelector(getAddress);
  const [connectStatus, setConnectStatus] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {

    if (web3Modal.cachedProvider && !sign){
      web3Modal.clearCachedProvider();
    }

    if (!nonceLock.current && !nonce){
      nonceLock.current = true;
      fetchNonceByServerless().then((response) => {
        const { code, data } = response.data;
        if (code === status.ok ){
          dispatch(setNonce(data.nonce));
        }
      }).catch(() => {
        nonceLock.current = false;
      });
    }

    if (typeof window.ethereum !== 'undefined' && !sign){
      setTimeout(() => {
        setConnectStatus(1);
        if (!timer.current){
          timer.current = setInterval(() => {
            if (window.ethereum.selectedAddress){
              clearInterval(timer.current);
              dispatch(setAddress(window.ethereum.selectedAddress));
            }
          },200);
        }
      }, 800);
    }

    if (sign){
      setConnectStatus(3);
    }

  }, [dispatch, nonce, sign]);

  const fetchAccountData = async () => {
    setConnectStatus(0);
    const provider = await web3Modal.connect();
    const ethers = new Ethers.providers.Web3Provider(provider);
    ethersRef.current = ethers;
    setEthers(ethers);
    setProvider(provider);
    setWeb3Modal(web3Modal);
    setConnectStatus(2);
  }

  const connectWallet = async () => {
    if (connectStatus === 1){
      try {
        await fetchAccountData()
      } catch(e) {
        console.log("Could not get a wallet connection", e);
        setConnectStatus(1);
        return;
      }
    }

    if (connectStatus === 2){
      createSign(nonce, address).then((sign) => {
        dispatch(setSign(sign));
        fetchVerifyResultByServerless(nonce, sign, address).then((response) => {
          const { code, data } = response.data;
          if (code === status.ok || code === status.admin){
            console.log('data', data)
            const premium = {
              learns: data.learns,
              potentials: data.potentials,
              yuque: data.yuque,
              code
            }
            dispatch(setPremiumDataSource(premium));
            setConnectStatus(3);
          } else {
            dispatch(setPremiumDataSource({
              learns: [],
              potentials: [],
              yuque: [],
              code: 1
            }));
          }
        });
      }).catch(() => {
        window.location.reload();
      });
    }

    if (connectStatus === 3){
      setIsModalVisible(true);
    }
  }

  const onCancel = (e) => {
    e.stopPropagation();
    setIsModalVisible(false);
  }

  const onOK = async () => {
    await logoutOfWeb3Modal();
  }

  const walletComp = useMemo(() => {
    if (connectStatus === 0){
      return <LoadingOutlined />
    }
    if (connectStatus === 1){
      return '连接钱包';
    }
    if (connectStatus === 2){
      return '验证钱包';
    }
    if (connectStatus === 3){
      return truncated(address);
    }
    return null
  }, [connectStatus, address]);

  return (
    <div className='wallet' onClick={connectWallet}>
      {walletComp}
      <Modal
        className='wallet-modal'
        visible={isModalVisible}
        title='提醒'
        onOk={onOK}
        onCancel={onCancel}
        centered
        cancelText='取消'
        okText='确定'
      >
        是否退出钱包？
        
      </Modal>
    </div>
  )
}

export default Wallet;