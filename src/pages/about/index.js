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
      
      <div className='about-content text-gray-500 text-xs'>
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
        <div className='about-name'>
          <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>为之取名</p>
          <div>“桑田”，春种秋收之意。</div>
        </div>
        <div className='about-introduction'>
          <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>功能介绍</p>
          <div style={{marginBottom: '5px'}}>
            收集和存储大量的空投数据，然后对数据进行加工提炼，研究当前和过去的空投规则，以及发现一些有趣的项目，主要包含如下三个功能：
          </div>
          <p className='introduction-padding'>* 提供学习策略，用来提高捕获未来重要空投的概率</p>
          <p className='introduction-padding'>* 提供潜在列表，猜测一些协议提前埋伏</p>
          <p className='introduction-padding'>* 提供 Web 通知，避免因为时效性而产生的损失</p>
        </div>
        <Statement accountTotal={accountTotal}/>
      </div>
    </div>
  )
}

export default About;