import { useState, useEffect, useMemo } from 'react';
import { Button, Modal } from 'antd';
import classnames from 'classnames';
import { createUnique } from '../../application/shared';
import Buy from '../../application/components/Buy/Buy';
import './Potential.css';

const zh_CN = 'zh_CN';

const Potential = (props) => {
  const { dataSource } = props;
  const [ potentialStatus, setPotentialStatus ] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  const onCancel = () => {
    setIsModalVisible(false);
  }

  const potentialClass = classnames({
    'potential': true,
    'potential-0': potentialStatus === 0
  });

  useEffect(() => {
    if (dataSource && dataSource.length > 0){
      setPotentialStatus(1);
    }
  }, [dataSource]);

  const renderMarkText = (mark) => {
    if (mark === 1){
      return '热';
    }
    if (mark === 2){
      return '已发币';
    }
    return '';
  }

  const renderContent = useMemo(() => {
    if (potentialStatus === 0){
      return (
        <Buy />
      )
    }

    if (potentialStatus === 1){
      return (
        <div className='potential-content'>
          {
            dataSource.map((v) => {
              return (
                <div className='potential-box' key={createUnique()} onClick={() => {
                  setIsModalVisible(true)
                  setModalData(v);
                }}>
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
              )
            })
          }
        </div>
      )
    }
  }, [potentialStatus, dataSource]);

  return (
    <div className={potentialClass}>
      {renderContent}
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
              {modalData.description[zh_CN][0]}
            </div>
          ) : ''
        }
      </Modal>
    </div>
  );
}

export default Potential;