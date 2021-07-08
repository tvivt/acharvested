import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import { parse } from 'usedjs/lib/querystring';
import { getArchived, setArchived } from '../../application/store/archived';
import { getAddress, getNonce, getSign, getLanguage } from '../../application/store/user';
import { getAccounts, getPrice } from '../../application/store/total';
import { createUnique } from '../../application/shared';
import { fetchArchivedByServerless, ArchivedEntity } from '../../application/shared/apis';
import { ResponseCode } from '../../application/shared/status';
import BookPNG from '../../images/book.jpeg';
import DashedPNG from '../../images/dashed-lines-white.png';
import './Archived.css';

const Archived = () => {
  const dispatch = useDispatch();
  const address = useSelector(getAddress);
  const nonce = useSelector(getNonce);
  const sign = useSelector(getSign);
  const language = useSelector(getLanguage);
  const archived = useSelector(getArchived);
  const accountTotal = useSelector(getAccounts);
  const priceTotal = useSelector(getPrice);
  const firstLock = useRef(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState<ArchivedEntity | null>(null);
  
  useEffect(() => {
    

    if (!firstLock.current && !sign){
      firstLock.current = true;
      const search = parse(window.location.search.substr(1));
      fetchArchivedByServerless(nonce, sign, address, 0).then(({data: archivedResponse}) => {
        if (archivedResponse.code === ResponseCode.ok){
          const { data } = archivedResponse;
          dispatch(setArchived(data));
          const searchItem = search.item;
          if (searchItem){
            const searchItemData = data.filter((v) => {
              const { name } = v;
              const newName = name.replace(/\s*/g,"");
              return searchItem === newName.toLocaleLowerCase()
            })[0];
            if (searchItemData){
              setModalData(searchItemData);
              setIsModalVisible(true);
            }
          }
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
  }, [dispatch, nonce, sign, address, archived]);

  const onCancel = () => {
    setIsModalVisible(false);
  }

  return (
    <div className='archived'>
      <div className='archived-ad'>
        <div className='archived-img'>
          <img src={BookPNG} alt='' className='img-book' />
          <div className='archived-text-container'>
            <div className='archived-text-padding'>
              <p>清洗2017年-至今约 1.8G 的历史空投数据，利用统计学寻找触发空投条件的范围并归纳策略，助您提高捕获未来重要空投的概率。</p>
              <p>付费订阅英文社区，聚合社区中热烈讨论有潜在空投概率的项目，助您提前埋伏，快人一步。</p>
              <p>强大的智能检查，为您的地址检查符合多少项空投条件，助您做到心中有数，底气十足。</p>
              <p>目前社区订阅{accountTotal}+，单个地址捕获空投价值总计${Math.ceil(priceTotal)} !</p>
            </div>
          </div>
        </div>
      </div>
      <div className='section-heading'>
        <img src={DashedPNG} alt='' />
        部分数据
      </div>
      <div className='archived-content'>
        {
          archived.length === 0 ? (
            <div className='archived-loading'>
              <LoadingOutlined />
            </div>
          ) : ''
        }
        {
          archived.map((v) => {
            return (
              <div 
                className='archived-box' 
                key={v.name} 
                onClick={() => {
                  setModalData(v);
                  setIsModalVisible(true);
                }}
              >
                <div className='archived-box-padding'>
                  <div className='archived-box-content'>
                    <div className='archived-box-header'>
                      <img src={v.icon} alt=''/>
                      {v.name}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <Modal
        className='archived-modal'
        centered
        visible={isModalVisible}
        closable={false}
        onCancel={onCancel}
        footer={[
          <Button key={createUnique()} onClick={onCancel}>取消</Button>,
          <Button key={createUnique()}>
            {
              modalData ? (
                <a href={modalData.url} target='_blank' rel="noreferrer">跳转</a>
              ) : ''
            }
          </Button>
        ]}
      >
        {
          modalData ? (
            <div>
              {
                modalData.rules[language].map((item, i) => {
                  return (
                    <div className='archived-modal-rules' key={createUnique()}>
                      <span className='archived-modal-rules-index'>{i+1}.</span>
                      <span>{item}</span>
                    </div>
                  )
                })
              }
            </div>
          ) : ''
        }
      </Modal>
    </div>
  )
}

export default Archived;