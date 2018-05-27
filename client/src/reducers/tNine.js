const INITIAL_STATE = {
  results: [],
  resultsPending: false
}

const setResults = (state, results) => ({ ...state, results, resultsPending: false })
const setPending = (state, resultsPending) => ({ ...state, resultsPending })

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `WORDS_PENDING`:
      return setPending(state, true)
    case `WORDS_SET`:
      return setResults(state, action.results)
    default:
      return state
  }
}