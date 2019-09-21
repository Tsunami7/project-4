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

const createMatches = async (data) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.post(`/users/${data.user1_id}/matches`, { match: data })
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
  console.log('ReadAllMatches',resp)
  // console.log(resp.data[0].post_comment)

  return resp.data
}

const readOneMatches = async (id, user_id) => {
  const resp = await api.get(`/users/${user_id}/matches/${id}`)
  // console.log(resp);
  return resp.data

}

const updateMatches = async (user_id, match_id, data) => {
  const token = localStorage.getItem('authToken');
  api.defaults.headers.common.authorization = `Bearer ${token}`
  const path = `/users/${user_id}/matches/${match_id}`
  console.log(data)

  // const path = `/users/${user_id}/matches/1`

  const resp = await api.put(path, { match: data })
  // console.log('updatematches',resp)

  return resp.data
}

const destroyMatches = async (id, user_id) => {
  const resp = await api.delete(`/users/${user_id}/matches/${id}`)
  return resp.data

}

// ---------------------
const createComment = async (match_id, data) => {
  const token = localStorage.getItem('authToken');
  api.defaults.headers.common.authorization = `Bearer ${token}`
  // What is the route i need to get to create a comment
  // /matches/:match_id/comments
  const path = `/matches/${match_id}/comments`
  console.log(path)
  const resp = await api.post(
    path,
    {
      comment: data
    }
  ) // needs match id and data
  return resp.data
}
// now make edit comment
const editComment = async (match_id, id, data) => {
  const token = localStorage.getItem('authToken');
  api.defaults.headers.common.authorization = `Bearer ${token}`
  // /matches/:match_id/comments/:id
  const path = `/matches/${match_id}/comments/${id}`
  const resp = await api.put(
    path,
    {
      comment: data
    }
  )
  return resp.data
}

// delete comment
const destroyComment = async (match_id, id) => {
  const resp = await api.delete(` /matches/${match_id}/comments/${id}`)
  return resp.data
}
// get all comment
const getAllComment = async (match_id, id) => {
  const token = localStorage.getItem('authToken');
  api.defaults.headers.common.authorization = `Bearer ${token}`
  const resp = `/matches/${match_id}/comments/${id}`
  return resp.data
}

export const allUser = async (id) => {
  const resp = await api.get(`/users/${id}`)

  return resp.data
}

// component to create are:
// CreateComment
// EditComment / can hold DestroyComment
// GetAllComment
// gonna start first by GetAllComment


export {
  createMatches,
  readAllMatches,
  readOneMatches,
  updateMatches,
  destroyMatches,
  createComment,
  editComment,
  destroyComment,
  getAllComment
}

// now call the function in the export fucntion like that they can be acces to other components

/*
match_comments GET    /matches/:match_id/comments(.:format)                                                    comments#index
               POST   /matches/:match_id/comments(.:format)                                                    comments#create
match_comment  GET    /matches/:match_id/comments/:id(.:format)                                                comments#show
               PATCH  /matches/:match_id/comments/:id(.:format)                                                comments#update
               PUT    /matches/:match_id/comments/:id(.:format)                                                comments#update
               DELETE /matches/:match_id/comments/:id(.:format)                                                comments#destroy

*/