import { createUnique } from '../../shared';
import './index.css';

const Card = (props) => {
  const { language, dataSource } = props;
  const { mark, direction } = dataSource;
  const markText = direction === 'potential' && !mark ? '已发币' : '';
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
                className='text-xs text-red-400'
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