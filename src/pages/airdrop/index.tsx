import { useState, useEffect, useRef, useMemo } from 'react';
import { Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { getLearns, getPotentials } from '../../application/store/premium';
import { getArchived, setArchived } from '../../application/store/archived';
import { getAddress, getNonce, getSign } from '../../application/store/user';
import { fetchArchivedByServerless } from '../../application/shared/apis';
import { ResponseCode } from '../../application/shared/status';
import Wallet from "../../application/components/Wallet/Wallet";
import Archived from './Archived';
import Learn from './Learn';
import Potential from './Potential';
import Checks from './Checks';
import './index.css';

const { TabPane } = Tabs;

const Airdrop = () => {

  const dispatch = useDispatch();
  const address = useSelector(getAddress);
  const nonce = useSelector(getNonce);
  const sign = useSelector(getSign);
  const learns = useSelector(getLearns);
  const potentials = useSelector(getPotentials);
  const archived = useSelector(getArchived);
  const [ tabActiveKey, setTabActiveKey ] = useState("1");
  const firstLock = useRef(false);
  const airdropDOM = useRef<HTMLDivElement | null>(null);
  const [airdropHeight, setAirdropHeight] = useState(0);
  const resetLock = useRef(false);

  useEffect(() => {

    if (!firstLock.current && !sign){
      firstLock.current = true;
      fetchArchivedByServerless(nonce, sign, address, 0).then(({data: archivedResponse}) => {
        if (archivedResponse.code === ResponseCode.ok){
          dispatch(setArchived(archivedResponse.data));
        }
      });
    }

    if (sign && archived.length === 9){
      fetchArchivedByServerless(nonce, sign, address, 0).then(({data: archivedResponse}) => {
        if (archivedResponse.code === ResponseCode.ok){
          dispatch(setArchived(archivedResponse.data));
        }
      });
    }

    if (!resetLock.current){
      resetLock.current = true;
      setAirdropHeight(airdropDOM.current!.clientHeight);
      window.addEventListener('resize', debounce(() => {
        setAirdropHeight(airdropDOM.current!.clientHeight);
      }, 500));
    }
    
  }, [dispatch, nonce, sign, address, archived, airdropHeight]);

  const tabOnChange = (key: string) => {
    setTabActiveKey(key);
  }

  const renderArchived = useMemo(() => {
    return <Archived dataSource={archived} airdropHeight={airdropHeight}/>;
  }, [archived, airdropHeight])

  const renderLearn = useMemo(() => {
    return <Learn dataSource={learns} airdropHeight={airdropHeight} />;
  }, [learns, airdropHeight]);

  const renderPotential = useMemo(() => {
    return <Potential dataSource={potentials} airdropHeight={airdropHeight} />
  }, [potentials, airdropHeight]);

  const renderChecks = useMemo(() => {
    return <Checks airdropHeight={airdropHeight} />
  }, [airdropHeight]);

  return (
    <div className='airdrop' ref={airdropDOM}>
      <div className='airdrop-padding'>
        <div className='airdrop-headers'>
          <div className='airdrop-title'>空投数据分析</div>
          <div className='airdrop-wallet'><Wallet /></div>
        </div>
      </div>
      <div className='airdrop-line-padding'>
        <div className='airdrop-line'></div>
      </div>
      <div className='airdrop-content'>
        <div className='airdrop-content-padding'>
          <Tabs defaultActiveKey={tabActiveKey} onChange={tabOnChange}>
            <TabPane tab='归档' key='1'>
              {renderArchived}
            </TabPane>
            <TabPane tab='学习' key='2'>
              {renderLearn}
            </TabPane>
            <TabPane tab='潜在' key='3'>
              {renderPotential}
            </TabPane>
            <TabPane tab='检查' key='4'>
              {renderChecks}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Airdrop;