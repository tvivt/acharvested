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
      alert('???????????????... !');
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
        alert('??????????????? discordId !');
        return;
      }
      if (!email){
        alert('????????????????????? !');
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
          alert('????????????');
          window.location.reload();
        } else {
          setSubmitStatus(0);
          alert('????????????');
        }
      }).catch(() => {
        lock.current = false;
        setSubmitStatus(0);
        alert('??????????????????????????????');
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
        <span> ????????? TX <a href={txURL} target='_blank' rel="noreferrer" >{txText}</a></span>
      )
    }
    if (countStatus === 3){
      return <span>???????????? {errorMessage}</span>
    }
    return '???'
  }, [countStatus, errorMessage, txText]);

  const buyButtonText = useMemo(() => {
    if (countStatus === 1){
      return '?????????'
    }
    if (countStatus === 2 && submitStatus === 0){
      return '??????'
    }
    if (countStatus === 2 && submitStatus === 1){
      return <span><LoadingOutlined/></span>
    }
    return '??????'
  },[countStatus, submitStatus]);

  const footerButtons = [
    <Button key={createUnique()} onClick={onCancel}>??????</Button>,
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
          ???????????????
          <span>??????</span>
          <span>
            <a 
              href='https://github.com/icepy/acharvested/issues/2#issuecomment-871366013'
              target='_blank'
              rel="noreferrer"
            >
              ??????
            </a>
          </span>
          <span>???</span>
          <span>
            <a 
              href='https://github.com/icepy/acharvested/issues/2#issuecomment-871366465'
              target='_blank'
              rel="noreferrer"
            >
              ????????????
            </a>
          </span>
          <span>??????????????????????????????</span>
        </div>
        <div className='buy-desc'>
          ???????????????180 {symbolValue.toLocaleUpperCase()} / ???
        </div>
        <div className='buy-status'>
          ???????????????{buying} 
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
              label="???????????????"
              name="address"
              rules={[{ required: true}]}
            >
              <Input disabled={true}/>
            </Form.Item>
            <Form.Item
              label="?????? TX"
              name="tx"
              rules={[{ required: true}]}
            >
              <Input disabled={true}/>
            </Form.Item>
            <Form.Item
              label="??????"
              name="email"
              rules={[{ required: true, message: '????????????????????? !' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="discordId"
              name="discordId"
              rules={[{ required: true, message: '??????????????? discordId !' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="?????????"
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