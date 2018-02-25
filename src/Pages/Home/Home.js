import React, { Component } from 'react';
import Nav from '../../modules/Nav'
import {Title} from './HomeModules.js'
import ScrollNavigation from './ScrollNavigation.js'
import UniproLogo from '../../modules/UniproLogo'
import './home.css'
import {connect} from 'react-redux'
import {init,stopAnimation} from './background/background.js'
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
    const {imgSrc, titleText} = this.props
    return(
      <div
        className='home-content'
        style={!!imgSrc? {backgroundImage: `url(${imgSrc})`}: null}>
        <Title titleText={titleText} />
        <Background />
        <div className='overlayBlend'></div>
        <div className='secondOverlayBlend'></div>
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
    return <canvas className="scene scene--full" id="scene"></canvas>
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
    // init()
  }
  componentWillUnmount() {
    stopAnimation()
  }

  nextBlogPost = () => {
    scrollIncrement = 0
    scrollValue = 0
      console.log("nextBlogPost",this.props.selectedChapter)
    this.props.dispatch(selectChapter(this.props.selectedChapter + 1))
    // if(this.state.chapter < storyText.length - 1) this.setState({chapter: this.state.chapter + 1 })
    // else {
    //   this.setState({chapter: 0})
    //   // this.props.history.push('/about')
    // }
  }
  previousBlogPost = () => {
    scrollIncrement = 0
    scrollValue = 0
    console.log("previousBlogPost",this.props.selectedChapter)
    this.props.dispatch(selectChapter(this.props.selectedChapter - 1))
    // if(this.state.chapter < storyText.length - 1) this.setState({chapter: this.state.chapter + 1 })
    // else {
    //   this.setState({chapter: 0})
    //   // this.props.history.push('/about')
    // }
  }

  onWheel = (e) => {

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
      setTimeout(()=>this.setState({midLoad: true}), 1000)
      setTimeout(()=>this.setState({loading: false, midLoad: false}), 2000)
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
