import {createStore} from 'redux';
import reducers from '../reducers';
import { composeWithDevTools } from "redux-devtools-extension";

import { Cookies } from 'react-cookie';

const cookies = new Cookies().getAll();

const initialState = {
    login: {
        showLoginModel:false,
        preMessageLogin: "",
        path: "/"
    },
    user: {
        id:"",
        email:"",
        token:""
    },
    questionario:{
        pergunta1: (cookies.pergunta1 && cookies.pergunta1.resposta),
        pergunta2: (cookies.pergunta2 && cookies.pergunta2.resposta),
        pergunta3: (cookies.pergunta3 && cookies.pergunta3.resposta),
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