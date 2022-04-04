import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import giramundoblaco from './giramundoblaco.gif'
import './Nav.css'

class Nav extends Component {

  render() {
    return (
      <div className='nav_Bar'>
        <img className='nav_Icon' src={giramundoblaco} alt="" />
        <p className='nav_title'>Henry's & Charly Countries App</p>
        <ul className='nav_links'>
          <li className='nav_link'>
            <Link className='link_Nav' to="/home" >Home</Link>
          </li>
          <li className='nav_link'>
            <Link className='link_Nav' to="/activity" >Activities</Link>
          </li>
        </ul>
      </div>
    );
  };
};

export default Nav;