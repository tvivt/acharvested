import { useState, useEffect, useRef, useMemo } from 'react';
import { Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getLearns, getPotentials } from '../../application/store/premium';
import { getArchived, setArchived } from '../../application/store/archived';
import { getAddress, getNonce, getSign } from '../../application/store/user';
import { fetchArchived } from '../../application/shared/apis';
import status from '../../application/shared/status';
import Wallet from "../../application/components/Wallet/Wallet";
import Archived from './Archived';
import Learn from './Learn';
import Potential from './Potential';
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

  useEffect(() => {

    if (!firstLock.current && !sign){
      firstLock.current = true;
      fetchArchived(nonce, sign, address, 0).then(({data: archivedResponse}) => {
        if (archivedResponse.code === status.ok){
          dispatch(setArchived(archivedResponse.data));
        }
      });
    }

    if (sign && archived.length === 5){
      fetchArchived(nonce, sign, address, 0).then(({data: archivedResponse}) => {
        if (archivedResponse.code === status.ok){
          dispatch(setArchived(archivedResponse.data));
        }
      });
    }
  }, [dispatch, nonce, sign, address, archived]);

  const tabOnChange = (key) => {
    setTabActiveKey(key);
  }

  const renderArchived = useMemo(() => {
    return <Archived dataSource={archived}/>;
  }, [archived])

  const renderLearn = useMemo(() => {
    return <Learn dataSource={learns} />;
  }, [learns]);

  const renderPotential = useMemo(() => {
    return <Potential dataSource={potentials} />
  }, [potentials]);

  return (
    <div className='airdrop'>
      <div className='airdrop-padding'>
        <div className='airdrop-headers'>
          <div className='airdrop-title'>数据分析工具</div>
          <div className='airdrop-wallet'><Wallet /></div>
        </div>
      </div>
      <div className='airdrop-line-padding'>
        <div className='airdrop-line'></div>
      </div>
      <div className='airdrop-content'>
        <div className='airdrop-content-padding'>
          <Tabs defaultActiveKey={tabActiveKey} onChange={tabOnChange}>
            <TabPane tab="归档" key="1">
              {renderArchived}
            </TabPane>
            <TabPane tab="学习" key="2">
              {renderLearn}
            </TabPane>
            <TabPane tab="潜在" key="3">
              {renderPotential}
            </TabPane>
            <TabPane tab="小额" key="4">
              即将到来
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Airdrop;