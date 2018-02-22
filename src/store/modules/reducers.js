const initialState = {
  selectedNav: '',
}

export default (state=initialState, action)=>{
  switch(action.type){
    case 'SELECT_NAV': return {
      ...state,
      selectedNav: action.payload
    }
    default: return state
  }
}
