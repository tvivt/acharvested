import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  PieChartOutlined,
  ContainerOutlined,
  SettingOutlined,
  BankOutlined
} from '@ant-design/icons';
import LogoPNG from '../../../images/logo.png';
import './index.css';

const MainMenu = () => {

  return (
    <div className='left-menu'>
      <div className='left-menu-logo'>
        <img src={LogoPNG} alt=''/>
        <span>桑田</span>
      </div>
      <div className='app-menu'>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to='/'>数据分析</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BankOutlined />}>
            <Link to='/airdrop'>定投策略</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            <Link to='/plugins'>插件集合</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined />}>
            <Link to='/setting'>本地设置</Link>
          </Menu.Item>
        </Menu>         
      </div>
    </div>
  )
}

export default MainMenu;