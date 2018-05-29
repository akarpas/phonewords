import apiCall from '../utils/api.js'

export const getWords = (dispatch, number) => {
  dispatch({
    type: 'WORDS_PENDING'
  }) 
  return apiCall('/t9', number, 'POST').then(results => {
      dispatch({
        type: 'WORDS_SET',
        results
      })
    }).catch(err => {
      console.log(err)
    });
}
