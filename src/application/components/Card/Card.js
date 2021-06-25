import classnames from 'classnames';
import { createUnique } from '../../shared';
import './index.css';

const Card = (props) => {
  const { language, dataSource, direction } = props;
  const { mark } = dataSource;
  let markText = '';
  if (direction === 'potential' && mark === 1){
    markText = '热'
  }
  if (direction === 'potential' && mark === 2){
    markText = '已发币'
  }
  const markTextClass = classnames({
    'text-xs text-red-700': mark === 1,
    'text-xs text-red-300': mark === 2
  });
  return (
    <div className='card' key={dataSource.name}>
      <div className='card-container'>
        <div className='card-top'>
          <div className='card-icon'>
            <img src={dataSource.icon} alt='' />
          </div>
          <div className='card-title'>
            <a 
              href={dataSource.url}
              target='_blank'
              rel="noreferrer"
            >
              {dataSource.name}
              <span 
                className={markTextClass}
                style={{marginLeft: '5px'}}
              >
                {markText}
              </span>
            </a>
          </div>
        </div>
        <div className='card-content'>
          {
            dataSource.description[language].map((m) => {
              return (
                <p
                  key={createUnique()}
                >
                  {m}
                </p>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Card;