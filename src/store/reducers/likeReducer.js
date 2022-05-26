const initState = {}

const likeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_LIKE':
          return state

    case 'CREATE_LIKE_ERROR':
          return {
            ...state,
            error: action.error
          }

    case 'REMOVE_LIKE':
          return state

    case 'REMOVE_LIKE_ERROR':
          return {
            ...state,
            error: action.error
          }

    case 'UPDATA_LIKE':
          return state

    case 'UPDATA_LIKE_ERROR':
          return {
            ...state,
            error: action.error
          }

    default:
          return state

  }
}

export default likeReducer
