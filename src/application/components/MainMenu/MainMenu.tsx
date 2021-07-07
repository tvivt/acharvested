import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLearns } from '../../store/premium';
import Wallet from '../Wallet/Wallet';
import Buy from '../Buy/Buy';
import './index.css';

const MainMenu = () => {
  const dataSource = useSelector(getLearns);
  const renderLink = useMemo(() => {
    if (dataSource.length > 0){
      return (
        <>
          <Link to='/learn'>策略范围</Link>
          <Link to='/potential'>潜在空投</Link>
          <Link to='/checks'>自动检查</Link>
        </>
      )
    }

    return (
      <>
        <Buy text='策略范围' />
        <Buy text='潜在空投' />
        <Buy text='自动检查'/>
      </>
    )
  }, [dataSource])

  return (
    <div className='menu-content'>
      <Link to='/'>空投归档</Link>
      {renderLink}
      
      <div className='menu-wallet'>
        <Wallet />
      </div>
    </div>
  )
}

export default MainMenu;