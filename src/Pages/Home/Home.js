import React, { Component } from 'react';
import Nav from '../../modules/Nav'
import {Title} from './HomeModules.js'
import ScrollNavigation from './ScrollNavigation.js'
import UniproLogo from '../../modules/UniproLogo'
import './home.css'
import {connect} from 'react-redux'
import {init, stop} from './background/background.js'
import {selectChapter} from '../../store/modules/actions'

const ScrollArrow = () =>
<div className="scroll-arrow">
    <div></div>
</div>

const LoadingScreen = ({loading}) =>
<div className={loading? 'loading-screen on': 'loading-screen off' }>
  <div></div>
</div>

class HomeContent extends Component {
  shouldComponentUpdate(next) {
    return next.shouldComponentUpdate
  }
  render() {
    const {imgSrc, titleText, shouldComponentUpdate} = this.props
    return(
      <div
        className='home-content'
        style={!!imgSrc? {backgroundImage: `url(${imgSrc})`}: null}>
        <Title refresh={shouldComponentUpdate} titleText={titleText} />
        <Background />
        <div className={imgSrc?'overlayBlend':null}></div>
        <div className={imgSrc?'secondOverlayBlend':null}></div>
        <ScrollNavigation/>
        <div className='part-of-unipro'>
          <span>Part of</span>
          <a target='_blank' href="http://www.theuniprogroup.com"><UniproLogo/></a>
        </div>
      </div>
    )
  }
}


class Background extends Component {
  shouldComponentUpdate(nextProps) {
    return false;
  }
  render() {
    return [
      <div key='scene' className="scene scene--full" id="container"></div>
      // <div key='sphere' id="sphere"></div>
    ]
  }
}



var scrollValue = 0;
var scrollIncrement = 1
var wheeling;
var upperThreshold = 10
var lowerThreshold = -10


class Home extends Component {
  state = {
    loading: false,
    midLoad: false,
  }

  componentDidMount() {
    if(this.props.selectedChapter === 0) init()
  }
  componentWillUnmount() {
    stop()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.selectedChapter === 0) init('delay')
    else if(this.props.selectedChapter === 0) stop(750)
  }


  nextBlogPost = () => {
    scrollIncrement = 0
    scrollValue = 0
    if(this.props.selectedChapter < 5) this.props.dispatch(selectChapter(this.props.selectedChapter + 1))
    else this.props.dispatch(selectChapter(0))
  }
  previousBlogPost = () => {
    scrollIncrement = 0
    scrollValue = 0
    if(this.props.selectedChapter > 0) this.props.dispatch(selectChapter(this.props.selectedChapter - 1))
    else  this.props.dispatch(selectChapter(5))
  }

  onWheel = (e) => {

    // console.log("onWheel", e.deltaY, e)

    clearTimeout(wheeling);
     wheeling = setTimeout(() => {
       wheeling = undefined;
       scrollValue = 0
       upperThreshold = 10
       lowerThreshold = -10
     }, 200);

    if (e.deltaY < 0) {
      scrollValue = scrollValue + scrollIncrement;
    } else if (e.deltaY > 0) {
      scrollValue = scrollValue - scrollIncrement;
    }

    if(scrollValue > upperThreshold) {
      this.nextBlogPost()
      upperThreshold = 50
      setTimeout(() => {
        scrollIncrement = 1
        scrollValue = 0
      }, 400);
    } else if(scrollValue < lowerThreshold) {
      this.previousBlogPost()
      lowerThreshold = -50
      setTimeout(() => {
        scrollIncrement = 1
        scrollValue = 0
      }, 400);
    }

  }

  componentDidUpdate(oldProps,oldState){
    if(!this.state.loading && !oldState.loading){
      this.setState({loading:true, midLoad: false})
      setTimeout(()=>this.setState({midLoad: true}), 750)
      setTimeout(()=>this.setState({loading: false, midLoad: false}), 1500)
    }
  }

  render() {
    const {selectedChapter, blogPosts} = this.props
    const titleText = blogPosts.filter((post,i) => post.tag === selectedChapter)[0]

    if(!!titleText) {
      var imgSrc = titleText.backgroundImage
    }
    const newImgSrc = blogPosts[0].backgroundImage
    return (
      <div onWheel={this.onWheel} onTouchMove={this.onWheel}>
        <LoadingScreen loading={this.state.loading}/>
        <Nav/>
        <HomeContent shouldComponentUpdate={this.state.midLoad} imgSrc={imgSrc} titleText={titleText}/>
      </div>
    )
  }
}

export default connect(state => ({
  selectedChapter: state.data.selectedChapter,
  blogPosts: state.data.blogPosts
}))(Home)
