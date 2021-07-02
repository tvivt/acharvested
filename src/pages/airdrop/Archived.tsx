import { useState, FunctionComponent } from 'react';
import { Modal, Button } from 'antd';
import { useSelector } from 'react-redux';
import { getLanguage } from '../../application/store/user';
import { createUnique } from '../../application/shared';
import { ArchivedEntity } from '../../application/shared/apis';
import Loading from '../../application/components/Loading/Loading';
import './Archived.css';


interface ArchivedProps {
  airdropHeight: number;
  dataSource: ArchivedEntity[];
}

const Archived: FunctionComponent<ArchivedProps> = (props) => {
  const { dataSource, airdropHeight } = props;
  const language = useSelector(getLanguage);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState<ArchivedEntity | null>(null);

  const onCancel = () => {
    setIsModalVisible(false);
  }

  if (dataSource.length === 0){
    return (
      <div className='archived-loading'>
        <Loading />
      </div>
    )
  }

  const contentHeight = airdropHeight - 200;

  return (
    <div className='archived'>
      <div className='archived-content' style={{height: `${contentHeight}px`}}>
        {
          dataSource.map((v) => {
            return (
              <div
                className='archived-box'
                key={v.name}
                onClick={() => {
                  setModalData(v);
                  setIsModalVisible(true);
                }}
              >
                <div className='archived-icon'>
                  <img src={v.icon} alt=''/>
                </div>
                <div className='archived-name'>
                  {v.name}
                </div>
                <div className='archived-url'>
                  {v.url}
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