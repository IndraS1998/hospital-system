import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css';

const Navigation = () =>{
    return(
            <header >
                <nav>
                    <ul className='nav-list'>
                        <li className='nav-item'><Link to='/' >Home</Link></li>
                        <li className='nav-item'><Link to='/info'>Info</Link></li>
                        <li className='nav-item'><Link to='/help'>Need Help?</Link></li>
                        <li className='nav-item'><Link to='/signUp'>Sign Up</Link></li>
                    </ul>
                </nav>
            </header>
    )
}

export default Navigation