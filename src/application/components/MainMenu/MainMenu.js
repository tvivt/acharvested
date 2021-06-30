import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  PieChartOutlined,
  ContainerOutlined,
  SettingOutlined,
  BankOutlined,
  QuestionCircleOutlined
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
      <div className='left-menu-content'>
        <Menu
          className='main-menu'
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1" icon={<span className='icon'><PieChartOutlined /></span>}>
            <Link to='/'>数据分析</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<span className='icon'><BankOutlined /></span>}>
            <Link to='/automatic'>复利定投</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<span className='icon'><ContainerOutlined /></span>}>
            <Link to='/plugins'>插件集市</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<span className='icon'><SettingOutlined /></span>}>
            <Link to='/settings'>本地设置</Link>
          </Menu.Item>
        </Menu> 
        <div className='left-menu-feedback'>
          <span className='feedback-icon'>
            <QuestionCircleOutlined width='' />
          </span>
          <a 
            href='https://github.com/icepy/acharvested/issues/1'
            target='_blank'
            rel="noreferrer"
          >
            Feedback
          </a>
        </div>        
      </div>
    </div>
  )
}

export default MainMenu;