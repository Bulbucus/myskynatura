const reducer = (state, action) => {
  switch (action.type) {
    case 'toogle_login':
      return {
      ...state,
      login:{
        ...state.login,
        show: action.boolean,
        preMessage: action.text
      }
    }
    default:
      break;
  }
}

export default reducer;