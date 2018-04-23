import {byId} from '../utils'

const GOT_PUGS = 'GOT_PUGS'
const GOT_PUG = 'GOT_PUG'

const defaultPugs = {
  byId: {},
  count: 0
}

export const fetchPugs = () => ({
  api: '/api/pugs',
  method: 'get',
  types: ['LOADING_PUGS', GOT_PUGS, 'ERROR'],
  error: 'ERROR',
  cache: true
})

export const fetchPugsPaginated = (page = 0) => ({
  api: '/api/pugs',
  method: 'get',
  types: ['LOADING_PUGS', GOT_PUGS, 'ERROR'],
  body: {
    params: {
      page
    }
  },
  cache: true
})

export const fetchPug = (pugId) => ({
  api: `/api/pugs/${pugId}`,
  method: 'get',
  types: ['LOADING_PUG', GOT_PUG, 'ERROR'],
  cache: true
})

export const addPug = (pug) => ({
  api: '/api/pugs',
  method: 'post',
  types: ['LOADING_PUG', GOT_PUG, 'ERROR'],
  body: pug,
  success: ({payload, history}) => {
    history.push(`/pugs/${payload.id}`)
  }
})

export const updatePug = (pugId, pug) => ({
  api: `/api/pugs/${pugId}`,
  method: 'put',
  types: ['LOADING_PUG', GOT_PUG, 'ERROR'],
  body: pug
})

export default (state = defaultPugs, action) => {
  switch (action.type) {
    case GOT_PUGS:
      return {
        ...state,
        byId: {
          ...byId(action.payload),
          ...state.byId
        },
        count: state.count + action.payload.length
      }
    case GOT_PUG:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload
        }
      }
    default:
      return state
  }
}
