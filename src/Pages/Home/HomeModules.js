import React, { Component } from 'react';

export const Title = () =>
  <div className="title">
    Some really eye-catching <br/> engaging text
  </div>

export const ScrollNavigation = ({posts, handleSelect, selected}) => {
  console.log("selected",selected)
  const Line = ({text, tag}) =>
  <div className={selected === tag?'lineWrap selected': 'lineWrap'} >
    <div className='text'>{text}</div>
    <div className='line'></div>
    <div className='overlay' data-value={tag} onClick={handleSelect}></div>
  </div>
  return (
    <div className="scroll-navigation">
      <Line tag='home' text='Home'/>
      { posts.map((post,i) =>
        <Line key={i} tag={post.tag} text={post.title}/>
      )}
    </div>
  )
}
