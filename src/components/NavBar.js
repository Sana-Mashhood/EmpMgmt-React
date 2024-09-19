import React, { useState } from 'react';
import { Menu } from 'antd';

const items = [
  {
    label: (
      <a href="/">
        Home
      </a>
    ),
    key: 'mail',
  },
  {
    label: 'Employee Management',
    key: 'EmpMgmt',
    children: [
      {
        label: 'Employee List',
        children: [
          {
            label: (
              <a href="/displayData">
                View Employee Data
              </a>
            ),
            key: 'displaydata',
          },
          {
            label: (
              <a href="/inputForm">
                Add New Employee
              </a>
            ),
            key: 'newemployee',
          },
        ],
      },
    ],
  },
];
const NavBar = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
    };
    return (
        <div className='navbar'>
                <Menu className='center' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />

        </div>
);
}

export default NavBar