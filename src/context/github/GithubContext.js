import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    loading: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get search results
  const searchUsers = async (text) => {
    setLoading()

    const params = new URLSearchParams({
      q: text
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    const { items } = await response.json()
    dispatch({
      type: 'GET_USERS',
      payload: items
    })
  }

  // Get singleUser
  const getUser = async (username) => {
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users/${username}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    if (response.status === 404) {
      window.location = '/notfound'
    }
    else {
      const data = await response.json()
      dispatch({
        type: 'GET_USER',
        payload: data
      })
    }
  }

  const getUserRepos = async (username) => {
    setLoading()

    const res = await axios.get(
      `${GITHUB_URL}/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };


  // Set loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING'
    })
  }

  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS'
    })
  }

  return <GithubContext.Provider value={{
    users: state.users,
    loading: state.loading,
    user: state.user,
    searchUsers,
    getUser,
    clearUsers
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext