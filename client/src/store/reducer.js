// global reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'toogle_login':
      return {
      ...state,
      login:{
        ...state.login,
        show: action.boolean,
        preMessage: action.text || '',
        path: action.path || '/'
      }
    }
    case 'send_token':
      return {
        ...state,
        user:{
          ...state.user,
          id: action.id,
          token:  action.token
        }
      }
    default:
      break;
  }
}

export default reducer;