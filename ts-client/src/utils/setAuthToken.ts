import axios from 'axios'

const setAuthToken = (token: string) => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token
  } else {
    // Delete Auth Header
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken
