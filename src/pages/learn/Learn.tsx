import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createUnique } from '../../application/shared';
import { getLearns } from '../../application/store/premium';
import './Learn.css';

const zh_CN = 'zh_CN';

const Learn = () => {
  const dataSource = useSelector(getLearns);
  
  useEffect(() => {
    if (dataSource.length === 0){
      window.location.href = '/';
      return
    }
  } ,[dataSource]);

  return (
    <div className='learn'>
      <div className='learn-content'>
        {
          dataSource.map((v) => {
            return (
              <div className='learn-box' key={createUnique()}>
                <div className='learn-padding'>
                  <div className='learn-headers'>
                    <div className='learn-icon'>
                      <img src={v.icon} alt=''/>
                    </div>
                    <div className='learn-name'>
                      <a href={v.url} target='_blank' rel="noreferrer">
                        {v.name}
                      </a>
                    </div>
                  </div>
                  <div className='learn-desc'>
                    {
                      v.description[zh_CN].map((text, i) => {
                        return (
                          <div key={createUnique()}>
                            <span style={{marginRight: '5px'}}>{i+1}. </span>
                            <span>{text}</span>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Learn;