
const assets = (ctx => ctx.keys().map(ctx))(require.context('../../assets', true, /.*/))

const initialState = {
  selectedChapter: 0,
  blogPosts: [
    {
      tag: 1,
      title: 'Play drives progress',
      text: 'Play drives progress',
      link:'https://medium.com/',
      backgroundImage: assets[0]
    },
    {
      tag: 2,
      title: 'The fight against entropy',
      text: 'The fight against entropy',
      link:'https://medium.com/',
      backgroundImage: assets[1]
    },
    {
      tag: 3,
      title: 'Kahneman, Tversky & Tech',
      text: 'Kahneman, Tversky & Tech',
      link:'https://medium.com/',
      backgroundImage: assets[2]
    },
    {
      tag: 4,
      title: 'Digital endpoints - the frictionless world',
      text: 'Digital endpoints - <br /> the frictionless world',
      link:'https://medium.com/',
      backgroundImage: assets[3]
    },
    {
      tag: 5,
      title: 'The humanity of technology',
      text: 'The humanity of technology',
      link:'https://medium.com/',
      backgroundImage: assets[4]
    },
  ]
}

export default (state=initialState, action)=>{
  console.log("action.payload",action.payload)
  switch(action.type){
    case 'SELECT_CHAPTER': return {
      ...state,
      selectedChapter: action.payload
    }
    default: return state
  }
}
