import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import { createUnique } from '../../application/shared';
import { getPotentials } from '../../application/store/premium';
import { PotentialEntity } from '../../application/shared/apis';
import './Potential.css';

const zh_CN = 'zh_CN';

const Potential = () => {
  const dataSource = useSelector(getPotentials);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState<PotentialEntity| null>(null);

  useEffect(() => {
    if (dataSource.length === 0){
      window.location.href = '/';
      return
    }
  } ,[dataSource]);
  
  const onCancel = () => {
    setIsModalVisible(false);
  }

  const renderMarkText = (mark: number) => {
    if (mark === 1){
      return '热';
    }
    if (mark === 2){
      return '已发币';
    }
    return '';
  }

  const renderContent = useMemo(() => {
    return (
      <div className='potential-content'>
        {
          dataSource.map((v) => {
            return (
              <div className='potential-box' key={createUnique()} onClick={() => {
                setIsModalVisible(true)
                setModalData(v);
              }}>
                <div className='potential-box-padding'>
                  <div className='potential-box-content'>
                    <div className='potential-icon'>
                      <img src={v.icon} alt=''/>
                    </div>
                    <div className='potential-name'>
                      {v.name}
                      <span className='potential-mark'>{renderMarkText(v.mark)}</span>
                    </div>
                    <div className='potential-url'>
                      {v.url}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }, [dataSource]);

  const renderModalContent = () => {
    if (!modalData) {
      return null;
    }
    const { description, guess } = modalData;
    const descContent = description[zh_CN];
    const guessContent = guess[zh_CN];
    const renderGuess = () => {
      if (Array.isArray(guessContent) && guessContent.length > 0){
        return (
          <>
            <div className='p-m-guess'>空投猜测</div>
            <div className='p-m-guess-content'>
              {
                guessContent.map((v, i) => {
                  return (
                    <div key={createUnique()}>
                      <span style={{marginRight: '5px'}}>{i+1}. </span>
                      <span>{v}</span>
                    </div>
                  )
                })
              }
            </div>
          </>
        )
      }
      return null;
    }
    const renderDesc = () => {
      if (Array.isArray(descContent) && descContent.length > 0){
        return (
          <>
            <div className='p-m-title'>项目介绍</div>
            <div className='p-m-content'>{modalData.name} - {descContent[0]}</div>
          </>
        )
      }
      return null;
    }
    return (
      <div className='potentail-modal-content'>
        {renderDesc()}
        {renderGuess()}
      </div>
    )
  }

  return (
    <div className='potential'>
      {renderContent}
      <Modal
        className='potential-modal'
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
        {renderModalContent()}
      </Modal>
    </div>
  );
}

export default Potential;