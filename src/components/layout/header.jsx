import { Link, NavLink } from 'react-router-dom';
// import './header.css'
import { Menu } from 'antd';
import { UserAddOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons';
import { useState } from 'react'

const Header = () => {

    const [current, setCurrent] = useState('');
    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />
        },
        {
            label: <Link to={"/users"}>User</Link>,
            key: 'users',
            icon: <UserAddOutlined />
        },
        {
            label: <Link to={"/books"}>Product</Link>,
            key: 'products',
            icon: <BookOutlined />
        }
    ];

    return <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
    />;
}

export default Header;