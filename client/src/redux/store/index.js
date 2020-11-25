import {createStore} from 'redux';
import reducers from '../reducers';

const initialState = {
    login: {
        showLoginModel:(document.location.search === "?=login"),
        preMessageLogin: ""
    }
}

const store = createStore(reducers, initialState);

export default store;