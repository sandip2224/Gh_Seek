const githubReducer = (state, action) => {
  console.log("------ State: ", state)
  console.log("------ Action: ", action)
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    default:
      return state
  }
}

export default githubReducer;