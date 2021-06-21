import './index.css';
import Statement from '../../components/Statement/Statement';
import GithubPNG from '../../images/github.png';
import TwitterPNG from '../../images/twitter.png';
import GitcoinPNG from '../../images/gitcoin.png';

const About = (props) => {
  const { total } = props;
  const accountTotal = !total ? 0 : total.account_total;
  const priceTotal = !total ? 0 : total.price_total || 0;
  return (
    <div className='about-container'>
      
      <div className='about-content text-gray-500 text-xs'>
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
        <div className='about-name'>
          <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>介绍</p>
          <div>
            于 2021/06/12 宣布推出“桑田”，喻为春种秋收之意。在以太坊网络中，尤其是 DeFi NFT 的蓬勃发展，为早期加密用户以空投的形式发放了数百万美元。
            桑田收集和存储了大量的空投数据，对数据进行加工提炼，研究当前和过去的空投规则，以及寻找一些有趣的项目。
          </div>
        </div>
        <div className='about-introduction'>
          <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>功能</p>
          <p className='introduction-padding'>* 归档历史空投让您阅读和了解</p>
          <p className='introduction-padding'>* 提供学习策略，用来提高捕获未来重要空投的概率</p>
          <p className='introduction-padding'>* 提供学习策略的操作指南，让您无须担心不知如何操作</p>
          <p className='introduction-padding'>* 提供潜在列表，猜测一些协议提前埋伏</p>
          <p className='introduction-padding'>* 提供 Web 通知，避免因为时效性而产生的损失</p>
        </div>
        <Statement 
          accountTotal={accountTotal}
          priceTotal={priceTotal}
        />
      </div>
    </div>
  )
}

export default About;