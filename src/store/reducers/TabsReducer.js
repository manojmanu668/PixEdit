const intiState = {
    Tabs: [ ]
}

const tabsReducer = (state = intiState, action) => {
    switch (action.type) { 
        case 'IF_DOC_EXISTS':
          console.log("tabs in reducer",action.payload)
      return {
        ...state,
        Tabs: action.payload
      }

      default:
      return state
    }

}
export default tabsReducer