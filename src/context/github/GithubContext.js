import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

import { successToast, infoToast, errorToast } from '../../components/error/errorHandler'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get search results
  const searchUsers = async (text) => {
    setLoading()

    const params = new URLSearchParams({
      q: text
    })

    try {
      const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`
        }
      })

      const { items } = await response.json()
      successToast("Users fetched successfully!")
      dispatch({
        type: 'GET_USERS',
        payload: items
      })
    }
    catch (err) {
      errorToast(err)
    }
  }

  // Get singleUser
  const getUser = async (username) => {
    setLoading()

    try {
      const response = await fetch(`${GITHUB_URL}/users/${username}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`
        }
      })

      if (response.status === 404) {
        window.location = '/notfound'
        infoToast('User not found!')
      }
      else {
        const data = await response.json()
        successToast('User fetched successfully!')
        dispatch({
          type: 'GET_USER',
          payload: data
        })
      }
    }
    catch (err) {
      errorToast(err)
    }
  }

  const getUserRepos = async (username) => {
    setLoading()

    try {
      const response = await fetch(`${GITHUB_URL}/users/${username}/repos?per_page=5&sort=created:asc`)
      const data = await response.json()

      successToast('Repositories fetched successfully!')
      dispatch({
        type: 'GET_REPOS',
        payload: data
      });
    }
    catch (err) {
      errorToast(err)
    }
  };

  // Set loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING'
    })
  }

  const clearUsers = () => {
    infoToast('Cleared all fetched users!')
    dispatch({
      type: 'CLEAR_USERS'
    })
  }

  return <GithubContext.Provider value={{
    users: state.users,
    loading: state.loading,
    user: state.user,
    repos: state.repos,
    searchUsers,
    getUser,
    getUserRepos,
    clearUsers
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext