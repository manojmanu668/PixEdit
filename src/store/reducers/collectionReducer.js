const collectionReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_COLLECTION':
          return state

    case 'ADD_COLLECTION_ERROR':
          return {
            ...state,
            error: action.error
          }
    default:
          return state
  }
}

export default collectionReducer
