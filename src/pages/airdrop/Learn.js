import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import Buy from '../../application/components/Buy/Buy';
import { createUnique } from '../../application/shared';
import { getLearnTotal } from '../../application/store/total';
import './Learn.css';

const zh_CN = 'zh_CN';

const Learn = (props) => {
  const { dataSource } = props;
  const learnTotal = useSelector(getLearnTotal);
  const [ learnStatus, setLearnStatus ] = useState(0);

  const learnClass = classnames({
    'learn': true,
    'learn-0': learnStatus === 0
  });

  useEffect(() => {
    if (dataSource && dataSource.length > 0){
      setLearnStatus(1);
    }
  }, [dataSource]);

  const renderContent = useMemo(() => {
    if (learnStatus === 0){
      return (
        <Buy text={`操作策略（${learnTotal}）`}/>
      )
    }
    if (learnStatus === 1){
      return (
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
      );
    }
  }, [learnStatus, dataSource, learnTotal]);
  
  return (
    <div className={learnClass}>
      {renderContent}
    </div>
  )
}

export default Learn;