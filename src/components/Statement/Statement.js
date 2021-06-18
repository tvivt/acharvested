import { donateAddress } from '../../shared';
import './index.css';

const Statement = (props) => {
  const { accountTotal } = props;
  return (
    <>
      <div className='text-gray-500 text-sm'>
        <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>同意声明</p>
        <p className='statement-padding'>
          * ACHARVESTED 不提供任何财务建议，您应对您所做的任何事情负责。
        </p>
        <p className='statement-padding'>
          * ACHARVESTED 不保证这些将是未来的空投，您应该明白 ACHARVESTED 仅提供建议作为猜测。
        </p>
        <p className='statement-padding'>
          * 数百万美元以空投形式发放给早期的加密货币用户，但没有人知道未来的空投，我们可以猜测并希望是对的！
        </p>
      </div>
      <div className='statement-how-added text-gray-500 text-sm'>
        <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>如何加入许可名单列表 ?</p>
        <p className='statement-padding'>* 访问服务为 120 USDT/年，请发送 120 USDT 至 {donateAddress}</p>
        <p className='statement-padding'>* 请发送 TX, 钱包地址（必须和发送 120 USDT地址相同）和 邮箱至 foricepy@gmail.com</p>
        <p className='statement-padding'>* 在一个工作日内（周末顺延至工作日）添加至许可名单列表</p>
      </div>
      <div className='statement-subscrib-total text-gray-500 text-sm'>
        <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>实时数据：</p>
        <p className='statement-padding'>* 付费订阅用户： ({accountTotal})+</p>
      </div>
    </>
  )
}

export default Statement;