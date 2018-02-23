import React, { Component } from 'react';
import {selectChapter} from '../../store/modules/actions'
import {connect} from 'react-redux'
import {Line} from './HomeModules.js'

class ScrollNavigation extends Component {
  handleSelect = (e) => {
    this.props.dispatch(selectChapter(parseInt(e.target.dataset.value)))
  }
  render() {
    const {selectedChapter,blogPosts} = this.props
    return (
      <div className="scroll-navigation">
        <Line handleSelect={this.handleSelect} selectedChapter={selectedChapter} tag='home' text='Home'/>
        { blogPosts.map((post,i) =>
          <Line selectedChapter={selectedChapter}
            handleSelect={this.handleSelect} key={i} tag={post.tag} text={post.title}/>
        )}
      </div>
    )
  }
}

export default connect(state => ({
  selectedChapter: state.data.selectedChapter,
  blogPosts: state.data.blogPosts
}))(ScrollNavigation)
