import axios from 'axios'

export async function createUser(userData) {
  try {
    let data = await axios.post(process.env.REACT_APP_SERVER + 'users/new', userData)
    return {ok: true, data}
  } catch(error) {
    return {ok: false, error}
  }
}