import axios from 'axios';
const baseUrl = 'http://localhost:3000'
// const baseUrl = 'https://get-roaming.herokuapp.com/'


const api = axios.create({
  baseURL: baseUrl
})

export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', loginData)
  // console.log(resp.data)
  localStorage.setItem('authToken', resp.data.token);
  localStorage.setItem('userId', resp.data.id);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  // user does not exist yet at this stage
  // return resp.data.user
  // return token?
  return resp.data.token;
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/users', { user: registerData })
  return resp.data
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/users/verify');
    return resp.data
  }
  return false;
}

export const randomUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get(`/matches/random`)
    // console.log("RANDOM USER", resp);
    return resp.data
  } else {
    console.error('Cannot get ranom match when not logged in')
  }  
}

const createMatches = async (data, id) => {
  const token = localStorage.getItem('authToken');
  if (token){
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.post(`/users/${id}/matches`, { matches: data })
    return resp.data
  } else {
    console.error('Cannot create match when not logged in')
  }  

  return false
}

const readAllMatches = async (data, id) => {
  // console.log('matches',data)
  const token = localStorage.getItem('authToken');
  api.defaults.headers.common.authorization = `Bearer ${token}`
  const resp = await api.get(`/users/${id}/matches`) // need to send JWT
  // console.log(resp)
  // console.log(resp.data[0].post_comment)

  return resp.data
}

const readOneMatches = async (id, user_id) => {
  const resp = await api.get(`/users/${user_id}/matches/${id}`)
  return resp.data

}

const updateMatches = async (id, data, user_id) => {
  const resp = await api.put(`/users/${user_id}/edit/${id}`, { matches: data })
  console.log('updatematches',resp)
  
  return resp.data
}

const destroyMatches = async (id, user_id) => {
  const resp = await api.delete(`/users/${user_id}/matches/${id}`)
  return resp.data

}


export const allUser = async(id) => {
  const resp = await api.get(`/users/${id}`)
  return resp.data
}

export {
  createMatches,
  readAllMatches,
  readOneMatches,
  updateMatches,
  destroyMatches,
}