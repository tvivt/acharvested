import { useEffect, useMemo, useRef, useState, FunctionComponent, useCallback } from 'react';
import { Modal, Button, Divider, Form, Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { createUnique, getWeb3Provider } from '../../shared';
import { getConnectWalletStatus, getAddress } from '../../store/user';
import { getSupport } from '../../store/tokenlist';
import { ethers } from 'ethers';
import { postUndeterminedByServerless } from '../../shared/apis';
import DAIABI from '../../ABI/DAI.json';
import './Buy.css';
import { ResponseCode } from '../../shared/status';

const buyAddress = '0x09A8eA750a38A81b48E3AADF033F4d5095e76b2C';
const buyPrice = ethers.utils.parseEther("180").toBigInt();

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
  const address = useSelector(getAddress);
  const connectWalletStatus = useSelector(getConnectWalletStatus);
  const daiContract = useRef<ethers.Contract | null>(null);
  const [form] = Form.useForm();
  const lock = useRef(false);
  const [submitStatus, setSubmitStatus] = useState(0); 

  const setAddressFieldsValue = useCallback(() => {
    form.setFieldsValue({
      address
    });
  }, [address, form]);

  useEffect(() => {
    if (!daiContract.current && support.length > 0 && connectWalletStatus === 1){
      const web3Provider = getWeb3Provider();
      support.forEach((v) => {
        const symbolText = v.symbol.toLocaleLowerCase();
        if (symbolText === 'dai'){
          daiContract.current = new ethers.Contract(v.address, DAIABI.dai, web3Provider.getSigner());
        }
      });
    }
    if (address && form){
      setAddressFieldsValue();
    } 
  }, [support, connectWalletStatus, address, form, setAddressFieldsValue]);

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
      if (symbolValue === 'dai'){
        daiContract.current!.transfer(buyAddress, buyPrice).then((response: any) => {
          const { hash } = response;
          setTxText(hash);
          form.setFieldsValue({
            tx: hash
          });
          setCountStatus(2);
        }).catch((e: any) => {
          setErrorMessage(e.message);
          setTxText('');
          setCountStatus(3);
        });
      }
    }
    if (countStatus === 2 && !lock.current){
      const fields = form.getFieldsValue();
      const { address, code, discordId, email, tx } = fields;
      if (!discordId){
        alert('请输入你的 discordId !');
        return;
      }
      if (!email){
        alert('请输入你的邮箱 !');
        return;
      }
      lock.current = true;
      setSubmitStatus(1);
      postUndeterminedByServerless({
        address,
        tx,
        code,
        discordId,
        email
      }).then((response) => {
        const { code } = response.data;
        lock.current = false;
        if (ResponseCode.ok === code){
          alert('提交成功');
          window.location.reload();
        } else {
          setSubmitStatus(0);
          alert('提交失败');
        }
      }).catch(() => {
        lock.current = false;
        setSubmitStatus(0);
        alert('提交失败，请检查网络');
      });
    }
  }

  const buying = useMemo(() => {
    if (countStatus === 1){
      return <span><LoadingOutlined/></span>
    }
    if (countStatus === 2){
      const txURL = `https://cn.etherscan.com/tx/${txText}`;
      return (
        <span> 请检查 TX <a href={txURL} target='_blank' rel="noreferrer" >{txText}</a></span>
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
    if (countStatus === 2 && submitStatus === 0){
      return '提交'
    }
    if (countStatus === 2 && submitStatus === 1){
      return <span><LoadingOutlined/></span>
    }
    return '支付'
  },[countStatus, submitStatus]);

  const footerButtons = [
    <Button key={createUnique()} onClick={onCancel}>取消</Button>,
    <Button key={createUnique()} onClick={onOk}>{buyButtonText}</Button>
  ]

  const buySuccessClass = classnames({
    'buy-success-none': !(countStatus === 2)
  });

  return (
    <div className='we-buy'>
      <div onClick={openModal} className='buy-button'>{text}</div>
      <Modal
        className='we-modal'
        centered
        visible={isModalVisible}
        closable={false}
        onCancel={onCancel}
        footer={footerButtons}
        forceRender
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
          订阅价格：180 {symbolValue.toLocaleUpperCase()} / 年
        </div>
        <div className='buy-status'>
          支付状态：{buying} 
        </div>
        <div className={buySuccessClass}>
          <Divider plain />
          <Form
            form={form}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="以太坊地址"
              name="address"
              rules={[{ required: true}]}
            >
              <Input disabled={true}/>
            </Form.Item>
            <Form.Item
              label="交易 TX"
              name="tx"
              rules={[{ required: true}]}
            >
              <Input disabled={true}/>
            </Form.Item>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[{ required: true, message: '请输入你的邮箱 !' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="discordId"
              name="discordId"
              rules={[{ required: true, message: '请输入你的 discordId !' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="邀请码"
              name="code"
              rules={[{ required: false }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default Buy;