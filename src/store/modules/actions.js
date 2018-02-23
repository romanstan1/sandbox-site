
export const selectChapter = (selectedChapter) => {
  return dispatch => dispatch({
    type: 'SELECT_CHAPTER',
    payload: selectedChapter
  })
}
