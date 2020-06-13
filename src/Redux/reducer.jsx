import { isAuth, FETCH_USER_DATA, FETCH_USER_FAILURE, POST_USER_SUCCESS, POST_USER_DATA, POST_USER_FAILURE } from './actionTypes'


export const initState = {
    is_auth: false,
    token: [],
    isloading: false,
    iserror: false,
    isregister: false
};

export default (state, { type, data }) => {
    console.log(type, data);
    switch (type) {
        case isAuth:
            return {
                ...state,
                is_auth: !state.isAuth,
                token: data
            };
        case FETCH_USER_DATA:
            return {
                ...state,
                isloading: true,
                iserror: false,
            }
        case FETCH_USER_FAILURE:
            return {
                ...state,
                isloading: false,
                iserror: true
            }
        case POST_USER_DATA:
            return {
                ...state,
                isloading: true,
                iserror: false,
            }
        case POST_USER_SUCCESS:
            return {
                ...state,
                isloading: false,
                isregister: true,
                iserror: false,
            }
        case POST_USER_FAILURE:
            return {
                ...state,
                isloading: false,
                iserror: true
            }
        default:
            return state;
    }
};