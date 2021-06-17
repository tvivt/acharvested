import { useState, useMemo } from 'react';
import ReactModal from 'react-modal';
import archivedData from './archived.json';
import { createUnique } from '../../shared';
import './index.css';

// Archived airdrops
// We have a selected a history airdrops here for you to study.

const en_US = 'en_US';

const Archived = (props) => {
  console.log('Archived', props);
  const { language } = props;
  const [list] = useState(archivedData.archived);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  const closeModal = () => {
    setOpenModal(false);
    setModalContent(null);
  }

  const renderList = useMemo(() => {
    console.log('renderList', list)
    return list.map((v) => {
      return (
        <div 
          className='archived-box' 
          key={createUnique()}
          onClick={(e) => {
            if (e.target.nodeName === 'A'){
              return false;
            }
            setOpenModal((o) => !o);
            setModalContent(v);
          }}
        >
          <div className='archived-icon-container'> 
            <img src={v.icon} alt='' className='archived-icon'/>
          </div>
          <div className='archived-iv'>
            <div className='archived-symbol'>{v.name}</div>
            <div className='archived-url overflow-ellipsis overflow-hidden'>
              <a 
                href={v.url}
                target='_blank'
                rel="noreferrer"
              >
                {v.url}
              </a>
            </div>
          </div>
        </div>
      )
    })
  }, [list]);
  
  return (
    <div className='archived-container'>
      <div className='archived-header-bg'>
        <div className='archived-header'>
          <h1 className='archived-header-title text-white'>归档历史空投</h1>
          <h4 className='archived-header-des text-gray-50'>
            归档历史上已经发生的一系列空投来让您了解
          </h4>
        </div>
      </div>
      <div className='archived-contents'>
        { renderList }
      </div>
      {
        modalContent ? (
          <ReactModal
            isOpen={openModal}
            className='archived-modal'
            overlayClassName='archived-overlay'
            ariaHideApp={false}
          >
            <div className='archived-modal-content'>
              <div className='archived-modal-header'>
                <div className='archived-modal-header-icon'>
                  <img src={modalContent.icon} alt='' />
                </div>
                <div className='archived-modal-header-symbol'>{modalContent.name}</div>
              </div>
              <div>
                {
                  modalContent.rules[en_US].map((v, i) => {
                    return (
                      <div className='archived-modal-rules' key={createUnique()}>
                        <span className='rules-number'>{i+1}. </span>{v}
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className='archived-modal-buttons'>
              <div className='archived-modal-button' onClick={closeModal}>
                取消
              </div>
            </div>
          </ReactModal>
        ) : null
      }
    </div>
  )
}

export default Archived;