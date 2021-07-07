import { useEffect, useMemo, useRef, useState, FunctionComponent } from 'react';
import { Modal, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { createUnique, getWeb3Provider } from '../../shared';
import { getConnectWalletStatus } from '../../store/user';
import { getSupport } from '../../store/tokenlist';
import { ethers } from 'ethers';
import DAIABI from '../../ABI/DAI.json';
import './Buy.css';

const buyAddress = '0x1A56d61142AC107dbC46f1c15a559906D84eEd59';
const buyPrice = ethers.utils.parseEther("150").toBigInt();

interface BuyProps {
  text: string;
}

const Buy: FunctionComponent<BuyProps> = (props) => {

  const { text } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [countStatus, setCountStatus] = useState(0);
  const [symbolValue ] = useState('dai');
  const [errorMessage, setErrorMessage] = useState('');
  const [txText, setTxText] = useState('')
  const support = useSelector(getSupport);
  const connectWalletStatus = useSelector(getConnectWalletStatus);
  const daiContract = useRef<ethers.Contract | null>(null);

  useEffect(() => {
    if (!daiContract.current && support.length > 0 && connectWalletStatus === 1){
      const web3Provider = getWeb3Provider();
      support.forEach((v) => {
        const symbolText = v.symbol.toLocaleLowerCase();
        const address = v.address;
        if (symbolText === 'dai'){
          daiContract.current = new ethers.Contract(address, DAIABI.dai, web3Provider.getSigner());
        }
      });
    }
  }, [support, connectWalletStatus]);

  const openModal = () => {
    const web3Provider = getWeb3Provider();
    if (!web3Provider){
      alert('请连接钱包... !');
      return;
    }
    setIsModalVisible(true)
  }

  const onCancel = () => {
    setIsModalVisible(false);
    setCountStatus(0);
    setTxText('')
  }

  const onOk = async() => {
    if (countStatus === 0 || countStatus === 3){
      setCountStatus(1);
      if (symbolValue === 'dai'){
        daiContract.current!.transfer(buyAddress, buyPrice).then((response: any) => {
          const { hash } = response;
          setCountStatus(2);
          setTxText(hash);
        }).catch((e: any) => {
          setErrorMessage(e.message);
          setCountStatus(3);
          setTxText('');
        });
      }
    }
  }

  const buying = useMemo(() => {
    if (countStatus === 1){
      return <span><LoadingOutlined/></span>
    }
    if (countStatus === 2){
      const txURL = `https://cn.etherscan.com/tx/${txText}`;
      return (
        <span>
          已提交到以太坊网络，请检查 
          <a href={txURL} target='_blank' rel="noreferrer" >{txText}</a>，若成功请发送邮件至 foricepy@gmail.com</span>
      )
    }
    if (countStatus === 3){
      return <span>支付失败 {errorMessage}</span>
    }
    return '无'
  }, [countStatus, errorMessage, txText]);

  const buyButtonText = useMemo(() => {
    if (countStatus === 1){
      return '支付中'
    }
    return '支付'
  },[countStatus]);

  const footerButtons = countStatus === 2 ? (
    [
      <Button key={createUnique()} onClick={onCancel}>取消</Button>
    ]
  ) : (
    [
      <Button key={createUnique()} onClick={onCancel}>取消</Button>,
      <Button key={createUnique()} onClick={onOk}>{buyButtonText}</Button>
    ]
  );

  return (
    <div className='we-buy'>
      <div onClick={openModal} className='buy-button'>{text}</div>
      <Modal
        className='we-close'
        centered
        visible={isModalVisible}
        closable={false}
        onCancel={onCancel}
        footer={footerButtons}
      >
        <div className='buy-bef'>
          同意协议：
          <span>阅读</span>
          <span>
            <a 
              href='https://github.com/icepy/acharvested/issues/2#issuecomment-871366013'
              target='_blank'
              rel="noreferrer"
            >
              声明
            </a>
          </span>
          <span>或</span>
          <span>
            <a 
              href='https://github.com/icepy/acharvested/issues/2#issuecomment-871366465'
              target='_blank'
              rel="noreferrer"
            >
              手动支付
            </a>
          </span>
          <span>若支付请勿关闭此窗口</span>
        </div>
        <div className='buy-desc'>
          订阅价格：150 {symbolValue.toLocaleUpperCase()} / 年
        </div>
        <div className='buy-status'>
          支付状态：{buying} 
        </div>
      </Modal>
    </div>
  )
}

export default Buy;