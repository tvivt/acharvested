import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Menu, Button } from 'antd';
import {
  MailOutlined,
  DesktopOutlined,
  PieChartOutlined,
  ContainerOutlined,
  WalletOutlined,
  DollarOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { fetchTotalByServerless } from './application/shared';
import { setAllTotal } from './application/store/total'
import Archived from './pages/archived';
import Learn from './pages/learn';
import Potential from './pages/potential';
import About from './pages/about';
import Header from './application/components/Header/Header';
import LogoPNG from './images/logo.png';
import './App.css';

// code 99 初始化状态
// code 0 成功
// code 1 不在许可名单内
// code 10 特殊状态

const { SubMenu } = Menu;

function App(){
  const dispatch = useDispatch();
  const lock = useRef(true);
  useEffect(() => {
    if (lock.current){
      lock.current = false;
      fetchTotalByServerless().then((response) => {
        const { code: remoteCode, data } = response.data;
        if (remoteCode === 0){
          dispatch(setAllTotal({
            accountTotal: data.account_total,
            learnTotal: data.learn_total,
            potentialTotal: data.potential_total,
            priceTotal: data.price_total
          }))
        }
      })
    }
  },[dispatch])

  
  return (
    <div className='app'>
      <div className='app-container'>
      <Router>
        <div className='app-nav'>
          <div className='app-logo'>
            <img src={LogoPNG} alt=''/>
            <span>桑田</span>
          </div>
          <div className='app-menu'>
            <div></div>
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark"
            >
              <Menu.Item key="1" icon={<WalletOutlined />}>
                连接钱包
              </Menu.Item>
              <Menu.Item key="2" icon={<PieChartOutlined />}>
                空投数据
              </Menu.Item>
              <Menu.Item key="3" icon={<ContainerOutlined />}>
                插件集合
              </Menu.Item>
              <Menu.Item key="4" icon={<DollarOutlined />}>
                立即订阅
              </Menu.Item>
              <Menu.Item key="5" icon={<SettingOutlined />}>
                本地设置
              </Menu.Item>
            </Menu>         
          </div>
        </div>
        
        <div className='app-content'>
          归档，学习，潜在
          {/* <Route path='/' component={Archived} exact/>
          <Route path='/learn' component={Learn} />
          <Route path='/potential' component={Potential}/>
          <Route path='/about' component={About} /> */}
        </div>
      </Router>
      </div>
    </div>
  )
}

export default App;
