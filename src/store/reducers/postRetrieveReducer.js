const posts = (state = {}, action) => {
  switch (action.type) {
    case 'RETRIEVE_POST':
      return {
        ...action.posts
      }

    case 'RETRIEVE_POST_ERR':
      return {
        ...action.error
      }

    default:
      return state
  }
}

export default posts
