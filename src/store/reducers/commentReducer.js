const initState = {
  comments: [
    {
      comment: "Beautiful!",
      commentFrom: "userId",
      commentToPost: "postId",
      commentTime: "time"
    }
  ]
}

const commentReducer = (state = initState, action) {
  switch (action.type) {
    case 'CREATE_COMMENT':
      return state

    case 'CREATE_COMMENT_ERROR':
      return {
        ...state,
        error
      }

    default:
      return state

  }
}
