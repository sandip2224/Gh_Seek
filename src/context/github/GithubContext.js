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
    loading: false,
    error: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get search results
  const searchUsers = async (text) => {
    setLoading(true)

    const params = new URLSearchParams({
      q: text
    })

    try {
      const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`
        }
      })

      if (response.status !== 200) {
        throw new Error('Something went wrong!');
      }

      const { items } = await response.json()

      setLoading(false)
      successToast("Users fetched successfully!")
      dispatch({
        type: 'SET_USERS',
        payload: items
      })
    }
    catch (err) {
      setLoading(false)
      setErrorStatus()
      errorToast(err)
    }
  }

  // Get singleUser
  const getUser = async (username) => {
    setLoading(true)

    try {
      const response = await fetch(`${GITHUB_URL}/users/${username}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`
        }
      })

      setLoading(false)
      if (response.status === 404) {
        window.location = '/notfound'
        infoToast('User not found!')
      }
      else {
        const data = await response.json()
        successToast('User fetched successfully!')
        dispatch({
          type: 'SET_USER',
          payload: data
        })
      }
    }
    catch (err) {
      setLoading(false)
      setErrorStatus()
      errorToast(err)
    }
  }

  const getUserRepos = async (username) => {
    setLoading(true)

    try {
      const response = await fetch(`${GITHUB_URL}/users/${username}/repos?per_page=10&sort=created:desc`)

      if (response.status !== 200) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json()

      setLoading(false)
      successToast('Repositories fetched successfully!')
      dispatch({
        type: 'SET_REPOS',
        payload: data
      });
    }
    catch (err) {
      setLoading(false)
      setErrorStatus()
      errorToast(err)
    }
  };

  // Set loading
  const setLoading = (status) => {
    dispatch({
      type: 'SET_LOADING',
      payload: status
    })
  }

  // Set loading
  const setErrorStatus = () => {
    dispatch({
      type: 'SET_ERROR'
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
    error: state.error,
    searchUsers,
    getUser,
    getUserRepos,
    clearUsers
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext