import { useState, useRef, useEffect, useMemo, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import { Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { 
  getAddress, 
  setAddress, 
  getNonce, 
  setNonce, 
  setSign, 
  getSign, 
  setConnectWalletStatus
} from '../../store/user';
import { setPremiumDataSource } from '../../store/premium';
import { INFURA_ID } from '../../shared/constants';
import { 
  truncated,
  setWeb3Modal, 
  setProvider, 
  createSign,  
  setWeb3Provider,
  getWeb3Provider,
  logoutOfWeb3Modal
} from '../../shared';
import { fetchNonceByServerless, fetchVerifyResultByServerless } from '../../shared/apis';
import { ResponseCode, ConnectWalletStatus } from '../../shared/status';
import './index.css';

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

const UpdateWalletUI = {
  load: 0,
  connect: 1,
  verify: 2,
  success: 3
}

const Wallet = () => {

  const dispatch = useDispatch();
  const timer = useRef<number | undefined>(undefined);
  const nonceLock = useRef(false);
  const addressLock = useRef(false);
  const signLock = useRef(false);
  const nonce = useSelector(getNonce);
  const sign = useSelector(getSign);
  const address = useSelector(getAddress);
  const [updateWalletUIStatus, setUpdateWalletUIStatus] = useState(UpdateWalletUI.load);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {

    if (web3Modal.cachedProvider && !sign){
      web3Modal.clearCachedProvider();
    }

    if (!nonceLock.current && !nonce){
      nonceLock.current = true;
      fetchNonceByServerless().then((response) => {
        const { code, data } = response.data;
        if (code === ResponseCode.ok ){
          dispatch(setNonce(data.nonce));
        }
      }).catch(() => {
        nonceLock.current = false;
      });
    }

    if (!sign && !addressLock.current){
      addressLock.current = true;
      setTimeout(() => {
        setUpdateWalletUIStatus(UpdateWalletUI.connect);
        if (!timer.current){
          timer.current = window.setInterval(() => {
            const web3Provider = getWeb3Provider();
            if (web3Provider){
              const { selectedAddress, accounts} = web3Provider.provider as any;
              const address = selectedAddress || accounts[0];
              if (address){
                clearInterval(timer.current);
                dispatch(setAddress(address));
              }
            }
          },200);
        }
      }, 800);
    }

    if (sign){
      setUpdateWalletUIStatus(UpdateWalletUI.success);
    }

  }, [dispatch, nonce, sign, address]);

  const fetchAccountData = async () => {
    setUpdateWalletUIStatus(UpdateWalletUI.load);
    const provider = await web3Modal.connect();
    const web3Provider = new ethers.providers.Web3Provider(provider);
    setProvider(provider);
    setWeb3Provider(web3Provider);
    setWeb3Modal(web3Modal);
    setUpdateWalletUIStatus(UpdateWalletUI.verify);
    dispatch(setConnectWalletStatus(ConnectWalletStatus.initProvider))
  }

  const connectWallet = async () => {
    if (updateWalletUIStatus === 1){
      try {
        await fetchAccountData()
      } catch(e) {
        console.log("Could not get a wallet connection", e);
        setUpdateWalletUIStatus(UpdateWalletUI.connect);
        return;
      }
    }

    if (updateWalletUIStatus === 2 && !signLock.current){
      signLock.current = true;
      setUpdateWalletUIStatus(0);
      createSign(nonce, address).then((sign) => {
        fetchVerifyResultByServerless(nonce, sign, address).then((response) => {
          const { code, data } = response.data;
          if (code === ResponseCode.ok || code === ResponseCode.admin){
            const premium = {
              learns: data.learns,
              potentials: data.potentials,
              yuque: data.yuque,
              code
            }
            dispatch(setPremiumDataSource(premium));
            dispatch(setConnectWalletStatus(2));
            dispatch(setSign(sign));
            setUpdateWalletUIStatus(UpdateWalletUI.success);
          } else {
            dispatch(setPremiumDataSource({
              learns: [],
              potentials: [],
              yuque: [],
              code: 1
            }));
            alert('无法验证，原因是您不在许可名单内 !');
            return;
          }
        });
      }).catch(() => {
        window.location.reload();
      });
    }

    if (updateWalletUIStatus === 3){
      setIsModalVisible(true);
    }
  }

  const onCancel = (e: MouseEvent) => {
    e.stopPropagation();
    setIsModalVisible(false);
  }

  const onOK = async () => {
    await logoutOfWeb3Modal();
    dispatch(setConnectWalletStatus(0));
  }

  const walletComp = useMemo(() => {
    if (updateWalletUIStatus === 0){
      return <LoadingOutlined />
    }
    if (updateWalletUIStatus === 1){
      return '连接钱包';
    }
    if (updateWalletUIStatus === 2){
      return '签名登录';
    }
    if (updateWalletUIStatus === 3){
      return truncated(address);
    }
    return null
  }, [updateWalletUIStatus, address]);

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