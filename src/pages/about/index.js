import './index.css';
import Statement from '../../components/Statement/Statement';
import GithubPNG from '../../images/github.png';
import TwitterPNG from '../../images/twitter.png';
import GitcoinPNG from '../../images/gitcoin.png';

const About = (props) => {
  const { total } = props;
  const accountTotal = !total ? 0 : total.account_total;
  return (
    <div className='about-container'>
      
      <div className='about-content text-gray-500 text-sm'>
        <div className='about-cooperation'>
          <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>社区合作</p>
          <div>即将到来</div>
        </div>
        <div className='about-social-network'>
          <p className='text-lg text-gray-900' style={{marginBottom: '20px'}}>开源精神</p>
          <div className='about-items'>
            <a 
              href='https://github.com/icepy/acharvested'
              target='_blank'
              rel='noreferrer'
              className='text-gray-500 text-sm'
            >
              <div className='about-item'>
                <img src={GithubPNG} alt='' style={{marginRight: '5px'}} />
                前端项目开源
              </div>
            </a>
            <a 
              href='https://twitter.com/foricepy'
              target='_blank'
              rel='noreferrer'
              className='text-gray-500 text-sm'
            >
              <div className='about-item'>
                <img src={TwitterPNG} alt='' style={{marginRight: '5px'}} />
                @foricepy
              </div>
            </a>
            <a 
              href='https://gitcoin.co/grants/2755/acharvested'
              target='_blank'
              rel='noreferrer'
              className='text-gray-500 text-sm'
            >
              <div className='about-item'>
                <img src={GitcoinPNG} alt='' />
                欢迎捐赠
              </div>
            </a>
          </div>
        </div>
        <Statement accountTotal={accountTotal}/>
      </div>
    </div>
  )
}

export default About;