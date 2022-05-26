const initState = {
  projects: [
    {id: '0', title: 'do some JavaScript', content: 'blah blah blah...'},
    {id: '1', title: 'grab some vegitables', content: 'blah blah blah...'},
    {id: '2', title: 'have a cup of coffee', content: 'blah blah blah...'}
  ]
}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT':
          return {
            ...action.project
          }
    case 'CREATE_PROJECT_ERR':
          return state
    default:
      return state
  }
}

export default projectReducer
