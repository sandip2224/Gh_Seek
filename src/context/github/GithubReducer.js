const githubReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: false
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: false
      }
    case 'SET_REPOS':
      return {
        ...state,
        repos: action.payload,
        loading: false,
        error: false
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: true
      }
    case 'CLEAR_USERS':
      return {
        ...state,
        users: []
      }
    default:
      return state
  }
}

export default githubReducer;