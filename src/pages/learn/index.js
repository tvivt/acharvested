import { createUnique } from '../../shared';
import './index.css';


// Learn about airdrops
// New airdrops are released often. By following the below tips, you can improve your chances.Want to learn how?
// ACHARVESTED provides no financial advice, you are liable for any and all crypto activity you do.
// ACHARVESTED provides no guarantee these will be future airdrops, by reading below, you understand that ACHARVESTED if providing advice as a guess. 
// Millions of dollars are released in airdrops to early crypto users. But Nobody knows future airdrops. we can guess and hope to be right! 
// added in allowlist to within one working day

const Learn = (props) => {
  const { code, total, language, learn } = props;
  const learnTotal = !total ? 0 : total.learn_total;
  
  const renderFunc = () => {
    if (code === 99) {
      return <span style={{color: '#f6851B', fontSize: '14px'}}>需要使用钱包签名验证地址所有权并且在许可名单内。</span>
    }
    if (code === 0 || code === 10){
      return (
        <div className='learn-boxs'>
          {
            learn.map((v) => {
              return (
                <div className='learn-box' key={v.name}>
                  <div className='learn-box-container'>
                    <div className='learn-box-top'>
                      <div className='learn-box-icon'>
                        <img src={v.icon} alt='' />
                      </div>
                      <div className='learn-box-title'>
                        <a 
                          href={v.url}
                          target='_blank'
                          rel="noreferrer"
                        >
                          {v.name}
                        </a>
                      </div>
                    </div>
                    <div className='learn-box-content'>
                      {
                        v.description[language].map((m) => {
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
            })
          }
        </div>
      )
    }
    if (code === 1){
      return <span className='text-red-800' style={{fontSize: '14px'}}>无法验证，原因是您不在许可名单内! </span>;
    }
  }

  const renderStudy = renderFunc();

  return (
    <div className='learn-container'>
      <div className='learn-header-bg'>
        <div className='learn-header-titles'>
          <h1 className='learn-header-title text-white'>学习空投策略</h1>
          <h4 className='learn-header-des text-gray-50'>
            由于社区经常发布空投，通过遵循以下提示，您可以提高获取空投的概率.
          </h4>
        </div>
      </div>
      <div className='learn-content'>
        <div className='learn-collection'>
          <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>操作策略（{learnTotal}）</p>
          {renderStudy}
        </div>
      </div>
    </div>
  )
}

export default Learn;