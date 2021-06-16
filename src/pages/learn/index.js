import { donateAddress, createUnique } from '../../shared';
import './index.css';


// Learn about airdrops
// New airdrops are released often. By following the below tips, you can improve your chances.Want to learn how?
// ACHARVESTED provides no financial advice, you are liable for any and all crypto activity you do.
// ACHARVESTED provides no guarantee these will be future airdrops, by reading below, you understand that ACHARVESTED if providing advice as a guess. 
// Millions of dollars are released in airdrops to early crypto users. But Nobody knows future airdrops. we can guess and hope to be right! 
// added in allowlist to within one working day

const Learn = (props) => {
  const { code, total, language, learn } = props;

  const renderFunc = () => {
    if (code === 99) {
      return <span style={{color: '#f6851B', fontSize: '14px'}}>请签名验证地址所有权并且在许可名单内</span>
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
        <div>
          <p className='text-xl' style={{marginBottom: '5px'}}>同意声明</p>
          <p className='text-xs learn-padding'>
            * ACHARVESTED 不提供任何财务建议，您应对您所做的任何和所有加密活动负责。
          </p>
          <p className='text-xs learn-padding'>
            * ACHARVESTED 不保证这些将是未来的空投，您应该明白 ACHARVESTED 仅提供建议作为猜测。
          </p>
          <p className='text-xs learn-padding'>
            * 数百万美元以空投形式发放给早期的加密货币用户，但没有人知道未来的空投，我们可以猜测并希望是对的！
          </p>
        </div>
        
        <div className='learn-collection'>
          <p className='text-xl' style={{marginBottom: '5px'}}>操作策略（8）</p>
          {renderStudy}
        </div>

        <div className='learn-how-added'>
          <p className='text-xl' style={{marginBottom: '5px'}}>如何加入许可名单列表 ?</p>
          <p className='text-xs learn-padding'>* 访问服务为 120 USDT/年，请发送 120 USDT 至 {donateAddress}</p>
          <p className='text-xs learn-padding'>* 请发送 TX, 钱包地址（必须和发送 120 USDT地址相同）和 邮箱至 foricepy@gmail.com</p>
          <p className='text-xs learn-padding'>* 在一个工作日内（周末顺延至工作日）添加至许可名单列表</p>
        </div>
        <div className='learn-subscrib-total'>
          <p className='text-xl' style={{marginBottom: '5px'}}>实时数据：</p>
          <p className='text-xs learn-padding'>* 订阅用户： ({total})+</p>
        </div>
      </div>
    </div>
  )
}

export default Learn;