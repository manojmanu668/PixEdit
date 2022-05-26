const initState = {
    profileDetails: null
}

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE':
          return state
    case 'UPDATE_PROFILE_ERR':
          return state
    default:
          return state
  }
}

export default profileReducer
