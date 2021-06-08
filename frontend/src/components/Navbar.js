import React from 'react'
import {Link} from 'react-router-dom';
import {LOGOUT} from '../store/types/userTypes'
import {useSelector,useDispatch} from 'react-redux';
import '../css/components/navbar.css'

const Navbar = () => {
    const {user}  =useSelector((state)=> state.AuthReducer);
    const dispatch = useDispatch();
    const logoutHandler=()=>{
        localStorage.removeItem('myToken');
        dispatch({type:LOGOUT})
    }
    const Links = user?<div className="navbar__right">
        <li><Link to="/create">Create Post</Link></li>
        <li> <Link to="/dashboard">{user.name}</Link></li>
        <li> <span onClick={logoutHandler}>Logout</span> </li>
    </div> : <div className="navbar__right">
    <li>
    <Link to="/login">Login</Link>
</li>
<li>
    <Link to="/register">Sign up</Link>
</li>
</div>
    return (
            <nav className="navbar">
                <div className="container">
                    <div className="navbar__row">
                        <div className="navbar__left">
                            <Link to="/">
                                <img src="/images/mylogo.png"  alt="logo"/>
                            </Link>
                        </div>
                            
                        {Links}
                        
                        
                    </div>
                </div>

            </nav>
    )
}

export default Navbar;