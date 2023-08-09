import './header.css';
import { AppBar, Toolbar } from '@mui/material'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Header = () => {

    //const navigate = useNavigate();

    //const logout = async () => navigate('/login');
        
    return (
        <AppBar className='nav-bar'>
            <Toolbar className='menu'>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/login'>LOGOUT</Link>
            </Toolbar>
        </AppBar>
    )
}

export default Header;