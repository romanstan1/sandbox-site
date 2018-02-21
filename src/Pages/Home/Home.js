import React, { Component } from 'react';
import Nav from '../../modules/Nav'
import {Title, ScrollNavigation} from './HomeModules.js'
import './home.css'

const assets = (ctx => ctx.keys().map(ctx))(require.context('../../assets', true, /.*/))

export default class Home extends Component {
  state = {
    selected: 'home',
    blogPosts: [
      {
        tag: 'one',
        title: 'Blog Post One',
        mainColor: '23143',
        secondaryColor: '23143',
        backgroundImage: assets[0]
      },
      {
        tag: 'two',
        title: 'Blog Post Two',
        mainColor: '23143',
        secondaryColor: '23143',
        backgroundImage: assets[1]
      },
      {
        tag: 'three',
        title: 'Blog Post Three',
        mainColor: '23143',
        secondaryColor: '23143',
        backgroundImage: assets[2]
      },
      {
        tag: 'four',
        title: 'Blog Post Four',
        mainColor: '23143',
        secondaryColor: '23143',
        backgroundImage: assets[3]
      },
      {
        tag: 'five',
        title: 'Blog Post Five',
        mainColor: '23143',
        secondaryColor: '23143',
        backgroundImage: assets[4]
      },
    ]
  }

  handleSelect = (e) => {
    // console.log("handleSelect",e)
    this.setState({selected:e.target.dataset.value})
  }
  render() {
    console.log("this",this.state.selected)
    return (
      <div>
        <Nav/>
        <div className='home-content'>
          <Title/>
          <ScrollNavigation
            selected={this.state.selected}
            handleSelect={this.handleSelect}
            posts={this.state.blogPosts}
          />
          <div className="scroll-arrow"><div></div></div>
        </div>
      </div>
    )
  }
}
