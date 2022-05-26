const profileUpdate = (state = {}, action) => {
  switch (action.type) {
    case 'UPLOAD_PROFILE_PICTURE':
      return {
        ...state,
        message: 'your profile is succefully updated!'
      }

    case 'UPLOAD_PROFILE_PICTURE_ERROR':
      return {
        ...state,
        error: action.error
      }

    default:
      return state
  }
}

export default profileUpdate
