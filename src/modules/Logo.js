import React from 'react'
import {Link} from 'react-router-dom'

const Logo = () =>
  <div className='logo'>
    <Link to="/">
      <span className='unipro'>UNIPRO</span>
      <span className='sandbox'>SANDBOX</span>
      <span className='square'></span>
    </Link>
  </div>


export default Logo
