import { Link, NavLink } from 'react-router-dom';
// import './header.css'
import { Menu } from 'antd';
import { UserAddOutlined, HomeOutlined, BookOutlined, SettingOutlined, UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react'
import { AuthContext } from '../context/auth.context';

const Header = () => {

    const [current, setCurrent] = useState('');

    const { user } = useContext(AuthContext);

    console.log(user);

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
        },

        {
            label: 'Account',
            key: 'SubMenu',
            icon: <UserOutlined />,
            children: [
                {
                    label: <Link to={"/login"}>Đăng nhập</Link>,
                    // key: 'products',
                    icon: <LoginOutlined />
                },
                {
                    label: <Link to={"/"}>Đăng xuất</Link>,
                    // key: 'products',
                    icon: <LogoutOutlined />
                },
            ],
        },
    ];

    return <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
    />;
}

export default Header;