import React, { Component } from 'react';


export class Title extends Component {

render() {
  const {titleText, refresh} = this.props
  // console.log("refresh",refresh)
  const createMarkup = (titleText) => {return {__html: titleText.text}}
  return <div className={refresh?"title": "title"}>
    {!!titleText?<h1 dangerouslySetInnerHTML={createMarkup(titleText)} />:
    <h1>We use emerging technologies to challenge the status quo</h1>}

    {titleText? <span className="blog-link">
      <a className='btn draw-border button' href={titleText.link}>Read More</a>
    </span>:null}
  </div>
  }
}

// export const Title = ({titleText}) => {
//   const createMarkup = (titleText) => {return {__html: titleText.text}}
//
//   return <div className="title">
//     {!!titleText?<span dangerouslySetInnerHTML={createMarkup(titleText)} />:
//     <span>We use emerging technologies to<br/> challenge the status quo</span>}
//
//     {titleText? <span className="blog-link">
//       <a className='btn draw-border' href={titleText.link}>View Blog</a>
//     </span>:null}
//   </div>
// }

export class Line extends Component {
  handleSelect = (e) => {
    this.props.handleSelect(e)
  }
  render() {
    const {selectedChapter, tag, text} = this.props
    return (
      <div className={selectedChapter === tag?'lineWrap selected': 'lineWrap'} >
        <div className='line'></div>
        <div className='text'>{text}</div>
        <div className='overlay' data-value={tag} onClick={this.handleSelect}></div>
      </div>
    )
  }
}
