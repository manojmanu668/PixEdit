const followReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FOLLOWED_USER':
        return state

    case 'FOLLOWING_ERROR':
      return {
        ...state,
        error: action.error
      }

    default:
        return state
  }
}

export default followReducer
