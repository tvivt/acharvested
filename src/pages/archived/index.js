import { Table } from 'antd';
import archivedData from './archived.json';
import { createUnique } from '../../shared'
import './index.css';

const list = archivedData.archived;
console.log(list)

const columns = [
  {
    title: 'Icon',
    dataIndex: 'icon',
    key: 'icon',
    render: (icon) => {
      return (
        <img src={icon} className='archived-icon' alt=''/>
      )
    }
  },
  {
    title: 'Symbol',
    dataIndex: 'token',
    key: 'token'
  },
  {
    title: 'Rules',
    dataIndex: 'rules',
    key: 'rules',
    render: (rules) => {
      const { en_US } = rules;
      return (
        <div className='rules-container'>
          {
            en_US.map((r, i) => {
              return (
                <div key={createUnique()}>
                  <span className='rules-number'>{i+1}. </span>{r}
                </div>
              )
            })
          }
        </div>
      )
    }
  },
  {
    title: 'Website',
    dataIndex: 'url',
    key: 'url',
    render: (url) => {
      return <a href={url} target='_blank' rel="noreferrer">{url}</a>
    }
  }
]



const Archived = () => {
  return (
    <div className='archived'>
      <Table
        columns={columns} 
        dataSource={list}
        bordered
        pagination={{
          defaultPageSize: 5
        }}
      />
    </div>
  )
}

export default Archived;