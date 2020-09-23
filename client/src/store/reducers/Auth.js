export const initialState = {
  user: null,
  allowedRoutes: null,
};

export default (state = initialState, action) => {
  if (action.type === "USER") {
    return {...state,user:action.payload,allowedRoutes:null};
  }
  if (action.type === "LOGOUT") {
    return initialState
  }
  if(action.type==="UPDATEINFO"){
    return {...state,user:{
      ...state.user,
      ...action.payload
    }
  }
  }
  if(action.type=="UPDATE"){
    return {
        ...state,
        user:{
        ...state.user,
        followers:action.payload.followers,
        following:action.payload.following
        },
        allowedRoutes: null
    }
}
if(action.type=="UPDATEPIC"){
    return {
        ...state,
        user:{
          ...state.user,
          pic:action.payload
        },
        allowedRoutes:null
    }
}
  return state;
};
