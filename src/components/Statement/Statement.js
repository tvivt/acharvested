import { donateAddress } from '../../shared';
import './index.css';

const Statement = (props) => {
  const { accountTotal } = props;
  const { priceTotal } = props;
  return (
    <>
      <div className='text-gray-500 text-xs'>
        <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>声明</p>
        <p className='statement-padding'>
          * 桑田不提供任何财务建议，您应对您所做的任何事情负责
        </p>
        <p className='statement-padding'>
          * 桑田不保证这些将是未来的空投，您应该明白 桑田 仅提供建议作为猜测
        </p>
        <p className='statement-padding'>
          * 没有人知道未来的空投，但我们可以猜测并希望是对的
        </p>
      </div>
      <div className='statement-how-added text-gray-500 text-xs'>
        <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>价格</p>
        <p className='statement-padding'>* 120 USDT/年</p>
      </div>
      <div className='statement-how-added text-gray-500 text-xs'>
        <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>订阅</p>
        <p className='statement-padding'>* 请发送 120 USDT 至 {donateAddress}</p>
        <p className='statement-padding'>* 然后发送 TX, 钱包地址（必须和发送 120 USDT地址相同）和 邮箱至 foricepy@gmail.com</p>
        <p className='statement-padding'>* 在一个工作日内（周末顺延至工作日）添加至许可名单列表</p>
      </div>
      <div className='statement-subscrib-total text-gray-500 text-xs'>
        <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>数据：</p>
        <p className='statement-padding'>* 付费订阅用户： ({accountTotal})+</p>
        <p className='statement-padding'>* 已获得空投的价值：${priceTotal}</p>
      </div>
    </>
  )
}

export default Statement;