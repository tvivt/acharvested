import { donateAddress } from '../../shared';
import './index.css';

const Learn = (props) => {
  const { code, total, learn } = props;

  const renderFunc = () => {
    if (code === 99) {
      return null
    }
    if (code === 0 || code === 10){
      return learn.map((v) => {
        return (
          <div>123</div>
        )
      });
    }
    if (code === 1){
      return 'Unable Verify';
    }
  }

  const renderStudy = renderFunc();

  return (
    <div className='learn-container'>
      <div className='learn-header-bg'>
        <div className='learn-header-titles'>
          <h1 className='learn-header-title text-white'>Learn about airdrops</h1>
          <h4 className='learn-header-des text-gray-50'>
            New airdrops are released often. By following the below tips, you can improve your chances.
    Want to learn how?
          </h4>
        </div>
      </div>
      <div className='learn-content'>
        <h1 className='text-base'>
          ACHARVESTED provides no financial advice, you are liable for any and all crypto activity you do.
        </h1>
        <h1 className='text-base'>
          ACHARVESTED provides no guarantee these will be future airdrops, by reading below, you understand that ACHARVESTED if providing advice as a guess. 
        </h1>
        <h1 className='text-base'>
          Millions of dollars are released in airdrops to early crypto users. But Nobody knows future airdrops. we can guess and hope to be right! 
        </h1>
        <div className='learn-collection'>
          {renderStudy}
        </div>
        <div className='learn-how-added'>
          <p className='text-2xl' style={{marginBottom: '5px'}}>How adding allowlist ?</p>
          <p className='text-sm'>* send $120 USDT/year to {donateAddress}</p>
          <p className='text-sm'>* send TX, address and your email to foricepy@gmail.com</p>
          <p className='text-sm'>* added in allowlist to within one working day</p>
        </div>
        <div className='learn-subscrib-total'>
          Subscribers {total}+
        </div>
      </div>
    </div>
  )
}

export default Learn;