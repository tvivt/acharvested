import { useSelector } from 'react-redux';
import { getCode, getPotential } from '../../application/store/premium';
import { getPotentialTotal } from '../../application/store/total';
import { getLanguage } from '../../application/store/user';
import { Link } from 'react-router-dom';
import Card from '../../application/components/Card/Card';
import './index.css'

const Potential = () => {
  const code = useSelector(getCode);
  const potential = useSelector(getPotential);
  const potentialTotal = useSelector(getPotentialTotal);
  const language = useSelector(getLanguage);
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
        <div className='potential-boxs'>
          {
            potential.map((v) => {
              return (
                <Card 
                  language={language} 
                  dataSource={v} 
                  key={v.name}
                  direction='potential'
                />
              )
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
      )
    }
  }
  const potentialList = renderFunc();
  return (
    <div className='potential-container'>
      <div className='potential-header-bg'>
        <div className='potential-header-titles'>
          <h1 className='potential-header-title text-white'>
            研究潜在空投
          </h1>
          <h4 className='potential-header-des text-gray-50'>
            这是一系列可能进行空投的项目列表，用于预警和关注
          </h4>
        </div>
      </div>
      <div className='potential-content'>
        <div className='potential-collection'>
          <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>
            潜在空投列表（{potentialTotal}）
          </p>
          {potentialList}
        </div>
      </div>
    </div>
  )
}

export default Potential;