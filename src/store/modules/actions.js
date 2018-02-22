
export const selectNav = (selected) => {
  return dispatch => dispatch({
    type: 'SELECT_NAV',
    payload: selected
  })
}
