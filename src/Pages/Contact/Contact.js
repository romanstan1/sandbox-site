
import React, { Component } from 'react';
import Nav from '../../modules/Nav'
import './contact.css'

export default class Contact extends Component {
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
            <div><a href="#">sandbox@theuniprogroup.com</a></div>
            <div>Wework Tower Bridge, 1 St Katherines Way, Wapping, London</div>
            <div>Part of <a target='_blank' href="www.theuniprogroup.com">theuniprogroup.com</a></div>
          </div>

        </div>
      </div>
    )
  }
}
