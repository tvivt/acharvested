import { useState } from 'react';
import ReactModal from 'react-modal';
import archivedData from './archived.json';
import { createUnique } from '../../shared';
import './index.css';

const list = archivedData.archived;

console.log('list',list)

const Archived = (props) => {
  console.log('Archived props', props);
  const { language } = props;
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  console.log('openModal', openModal);
  console.log('modalContent', modalContent);

  const listSelector = (data) => {
    setOpenModal(!openModal)
    setModalContent(data);
  }

  const closeModal = () => {
    setOpenModal(false);
    setModalContent(null);
  }

  return (
    <div className='archived-container'>
      {
        list.map((v) => {
          return (
            <div 
              className='archived-box' 
              key={createUnique()}
              onClick={(e) => {
                if (e.target.nodeName === 'A'){
                  return false;
                }
                listSelector(v)
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
      }
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
                  modalContent.rules[language].map((v, i) => {
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
                Cancel
              </div>
            </div>
          </ReactModal>
        ) : null
      }
    </div>
  )
}

export default Archived;