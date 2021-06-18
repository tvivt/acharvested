import './index.css'

const Potential = (props) => {
  const { code, total } = props;
  const potentialTotal = !total ? 0 : total.potential_total === 0 ? '即将到来' : total.potential_total;
  const renderFunc = () => {
    if (code === 99) {
      return <span style={{color: '#f6851B', fontSize: '14px'}}>需要使用钱包签名验证地址所有权并且在许可名单内。</span>
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
          <p className='text-lg text-gray-900' style={{marginBottom: '5px'}}>潜在空投列表（{potentialTotal}）</p>
          {potentialList}
        </div>
      </div>
    </div>
  )
}

export default Potential;