import { useState, useEffect, useMemo, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import Buy from '../../application/components/Buy/Buy';
import { createUnique } from '../../application/shared';
import { LearnEntity } from '../../application/shared/apis';
import { getLearns } from '../../application/store/total';
import './Learn.css';

const zh_CN = 'zh_CN';

interface LearnProps {
  airdropHeight: number;
  dataSource: LearnEntity[];
}

const Learn: FunctionComponent<LearnProps> = (props) => {
  const { dataSource, airdropHeight } = props;
  const learnTotal = useSelector(getLearns);
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

  const contentHeight = airdropHeight - 200;

  const renderContent = useMemo(() => {
    if (learnStatus === 0){
      return (
        <Buy text={`学习策略（${learnTotal}）`}/>
      )
    }
    if (learnStatus === 1){
      return (
        <div className='learn-content' style={{height: `${contentHeight}px`}}>
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
  }, [learnStatus, dataSource, learnTotal, contentHeight]);
  
  return (
    <div className={learnClass}>
      {renderContent}
    </div>
  )
}

export default Learn;