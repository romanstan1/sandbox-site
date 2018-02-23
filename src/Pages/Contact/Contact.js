import React, { Component } from 'react';
import Nav from '../../modules/Nav'
import './contact.css'
import {connect} from 'react-redux'


class Contact extends Component {
  render() {
    return (
      <div>
        <Nav/>
        <div className='contact-content'>

          <div className='about'>
            <p>
              Lorem ipsum dolor sit amet, consec tet ur ad ipisi cing elit.
               Ad re pudi andae voluptas vel id ducimus expedita qui dignissimos quibusdam
              iusto quisquam porro in sunt.
            </p>
          </div>

          <div className='details'>
            <div>
              <h3>Contact</h3>
              <a href="#">sandbox@theuniprogroup.com</a>
            </div>
            <div>
              <h3>Visit</h3>
              <p>WeWork Tower Bridge <br/> 1 St. Katharine's Way <br/> London E1W 1UN</p>
            </div>
            <div>
              <h3>Part of</h3>
              <a target='_blank' href="http://www.theuniprogroup.com">The Unipro Group</a></div>
          </div>

        </div>
      </div>
    )
  }
}

export default connect(state => ({
  // blogPosts: state.data.posts
}))(Contact)
