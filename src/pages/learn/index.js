import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
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
      return (
        <>
          <span style={{color: '#f6851B', fontSize: '14px'}}>
            使用去中心化钱包签名验证地址所有权以访问受限内容
          </span>
          <span style={{marginLeft: '10px', fontSize: '14px'}}>
            <Link to='/about'>购买付费订阅-查看如何加入许可名单列表</Link>
          </span>
        </>
      )
    }
    if (code === 0 || code === 10){
      return (
        <div className='learn-boxs'>
          {
            learn.map((v) => {
              return <Card language={language} dataSource={v} key={v.name}/>
            })
          }
        </div>
      )
    }
    if (code === 1){
      return (
        <>
          <span className='text-red-800' style={{fontSize: '14px'}}>
            无法验证，原因是您不在许可名单内! 
          </span>
          <span style={{marginLeft: '10px', fontSize: '14px'}}>
            <Link to='/about'>购买付费订阅-查看如何加入许可名单列表</Link>
          </span>
        </>
      );
    }
  }

  const renderStudy = renderFunc();

  return (
    <div className='learn-container'>
      <div className='learn-header-bg'>
        <div className='learn-header-titles'>
          <h1 className='learn-header-title text-white'>
            学习空投策略
          </h1>
          <h4 className='learn-header-des text-gray-50'>
            由于社区经常发布空投，通过遵循以下提示，您可以提高获取空投的概率.
          </h4>
        </div>
      </div>
      <div className='learn-content'>
        <div className='learn-collection'>
          <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>
            操作策略（{learnTotal}）
          </p>
          {renderStudy}
        </div>
      </div>
    </div>
  )
}

export default Learn;