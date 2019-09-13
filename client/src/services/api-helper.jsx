import axios from 'axios';
const baseUrl = 'http://localhost:3000'

const api = axios.create({
  baseURL: baseUrl
})

export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', loginData)
  console.log(resp)
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/users/', { user: registerData })
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

const createMatches = async (data) => {
  const resp = await api.post('/matches', { matches: data })
  return resp.data
}

const readAllMatches = async () => {
  const resp = await api.get('/matches')
  return resp.data
}

const readOneMatches = async (id) => {
  const resp = await api.get(`/matches/${id}`)
  return resp.data

}

const updateMatches = async (id, data) => {
  const resp = await api.put(`/matches/${id}`, { matches: data })
  return resp.data
}

const destroyMatches = async (id) => {
  const resp = await api.delete(`/matches/${id}`)
  return resp.data

}

export {
  createMatches,
  readAllMatches,
  readOneMatches,
  updateMatches,
  destroyMatches
}