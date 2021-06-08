import React from 'react'
import {Link} from 'react-router-dom';
import '../css/components/sidebar.css'
const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__element">
                <h3>Setting</h3>
            </div>
            <div className="sidebar__element">
                <Link>Change Password</Link>
            </div>
            <div className="sidebar__element">
                <Link>Change name</Link>
            </div>
        </div>
    )
}

export default Sidebar;