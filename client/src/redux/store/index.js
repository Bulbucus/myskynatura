import {createStore} from 'redux';
import reducers from '../reducers';
import { composeWithDevTools } from "redux-devtools-extension";

import { Cookies } from 'react-cookie';

import URLloginHandler from './initialStateLogin';

const cookies = new Cookies().getAll();
const allCookies = Object.values(cookies);

const initialState = {
    login: {
        showLoginModel: URLloginHandler().showLoginModel,
        preMessageLogin: URLloginHandler().preMessageLogin,
        path: URLloginHandler().path
    },
    user: {
        id:"",
        email:"",
        token:""
    },
    questionario: allCookies
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