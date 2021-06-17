import { donateAddress } from '../../shared';
import './index.css'

const Potential = (props) => {
  const { code, total } = props;
  const renderFunc = () => {
    if (code === 99) {
      return <span style={{color: '#f6851B', fontSize: '14px'}}>请签名验证地址所有权并且在许可名单内</span>
    }
    if (code === 0 || code === 10){
      return <span className='text-red-800' style={{fontSize: '14px'}}>即将到来</span>
    }
    if (code === 1){
      return <span className='text-red-800' style={{fontSize: '14px'}}>无法验证，原因是您不在许可名单内! </span>;
    }
  }
  const potentialList = renderFunc();
  return (
    <div className='potential-container'>
      <div className='potential-header-bg'>
        <div className='potential-header-titles'>
          <h1 className='potential-header-title text-white'>研究潜在空投</h1>
          <h4 className='potential-header-des text-gray-50'>
            这是一系列可能进行空投的项目列表，用于预警和关注
          </h4>
        </div>
      </div>
      <div className='potential-content'>
        <div className='potential-collection'>
          <p className='text-xl' style={{marginBottom: '5px'}}>潜在空投列表</p>
          {potentialList}
        </div>
        <div>
          <p className='text-xl' style={{marginBottom: '5px'}}>同意声明</p>
          <p className='text-xs potential-padding'>
            * ACHARVESTED 不提供任何财务建议，您应对您所做的任何事情负责。
          </p>
          <p className='text-xs potential-padding'>
            * ACHARVESTED 不保证这些将是未来的空投，您应该明白 ACHARVESTED 仅提供建议作为猜测。
          </p>
          <p className='text-xs potential-padding'>
            * 数百万美元以空投形式发放给早期的加密货币用户，但没有人知道未来的空投，我们可以猜测并希望是对的！
          </p>
        </div>
        <div className='potential-how-added'>
          <p className='text-xl' style={{marginBottom: '5px'}}>如何加入许可名单列表 ?</p>
          <p className='text-xs potential-padding'>* 访问服务为 120 USDT/年，请发送 120 USDT 至 {donateAddress}</p>
          <p className='text-xs potential-padding'>* 请发送 TX, 钱包地址（必须和发送 120 USDT地址相同）和 邮箱至 foricepy@gmail.com</p>
          <p className='text-xs potential-padding'>* 在一个工作日内（周末顺延至工作日）添加至许可名单列表</p>
        </div>
        <div className='potential-subscrib-total'>
          <p className='text-xl' style={{marginBottom: '5px'}}>实时数据：</p>
          <p className='text-xs potential-padding'>* 订阅用户： ({total})+</p>
        </div>
      </div>
    </div>
  )
}

export default Potential;