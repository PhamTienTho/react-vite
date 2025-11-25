import { Link, NavLink } from 'react-router-dom';
import './header.css'

const Header = () => {
    return (
        <ul>
            <li><NavLink to="/">Home</NavLink></li> 
            <li><NavLink to="/users">Users</NavLink></li>
            <li><NavLink to="/books">Books</NavLink></li>
        </ul>
    )// sử dụng component Link từ thư viện react-router thay cho thẻ a giúp cho trang không bị reload khi điều hàng sang route khác
}

export default Header;