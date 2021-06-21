import { useSelector } from 'react-redux';
import { getAccountTotal, getPriceTotal } from '../../application/store/total';
import Statement from '../../application/components/Statement/Statement';
import GithubPNG from '../../images/github.png';
import TwitterPNG from '../../images/twitter.png';
import GitcoinPNG from '../../images/gitcoin.png';
import './index.css';

const About = () => {
  const accountTotal = useSelector(getAccountTotal)
  const priceTotal = useSelector(getPriceTotal)
  return (
    <div className='about-container'>
      
      <div className='about-content text-gray-500 text-xs'>
        <Statement 
          accountTotal={accountTotal}
          priceTotal={priceTotal}
        />
        <div className='about-cooperation'>
          <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>社区</p>
          <div>即将到来</div>
        </div>
        <div className='about-social-network'>
          <p className='text-lg text-gray-900' style={{marginBottom: '20px'}}>开源</p>
          <div className='about-items'>
            <a 
              href='https://github.com/icepy/acharvested'
              target='_blank'
              rel='noreferrer'
              className='text-gray-500 text-xs'
            >
              <div className='about-item'>
                <img src={GithubPNG} alt='' style={{marginRight: '5px'}} />
                前端项目
              </div>
            </a>
            <a 
              href='https://twitter.com/foricepy'
              target='_blank'
              rel='noreferrer'
              className='text-gray-500 text-xs'
            >
              <div className='about-item' style={{marginRight: '10px'}}>
                <img src={TwitterPNG} alt='' style={{marginRight: '5px'}} />
                @FORICEPY
              </div>
            </a>
            <a 
              href='https://gitcoin.co/grants/2755/acharvested'
              target='_blank'
              rel='noreferrer'
              className='text-gray-500 text-xs'
            >
              <div className='about-item'>
                <img src={GitcoinPNG} alt='' />
                捐赠支持
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;