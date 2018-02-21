import React from 'react';
import { Link } from 'react-router-dom'
import Logo from './Logo'
import './modules.css'

const Nav = () =>
  <nav>
    <div className='logo'><Logo/></div>
    <div className='other'><Link to='/contact'>Contact</Link></div>
  </nav>

export default Nav;
