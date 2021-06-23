import { donateAddress } from '../../shared';
import './index.css';

const Statement = (props) => {
  const { accountTotal } = props;
  const { priceTotal } = props;
  return (
    <>
      <div className='about-name'>
        <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>介绍</p>
        <div>
          于 2021/06/12 宣布推出“桑田”，喻为春种秋收之意。在以太坊网络中，尤其是 DeFi NFT 的蓬勃发展，为早期加密用户以空投的形式发放了数百万美元。
          桑田收集和存储了大量的空投数据，并对数据进行加工提炼和对比，研究当前与过去的空投规则，以及寻找一些有趣的项目。
        </div>
      </div>
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
        <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>功能</p>
        <p className='statement-padding'>* 归档历史空投让您阅读和了解</p>
        <p className='statement-padding'>* 提供学习策略，用来提高捕获未来重要空投的概率</p>
        <p className='statement-padding'>* 提供学习策略的操作指南，让您无须担心不知如何操作</p>
        <p className='statement-padding'>* 提供潜在列表，猜测一些协议提前埋伏</p>
        <p className='statement-padding'>* 提供 Web 通知，避免因为时效性而产生的损失</p>
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
        <p className='statement-padding'>* 空投总价值（按最低空投量计算）：${priceTotal}</p>
      </div>
    </>
  )
}

export default Statement;