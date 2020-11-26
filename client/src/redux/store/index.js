import {createStore} from 'redux';
import reducers from '../reducers';
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
    login: {
        showLoginModel:false,
        preMessageLogin: ""
    },
    user: {
        id:"",
        email:"",
        token:""
    },
    questionario:{
    }
}

const composeEnhancers = composeWithDevTools({
    trace: true,
    traceLimit: 25,
  })

const store = createStore(
    reducers,
    initialState,
    composeEnhancers());

export default store;