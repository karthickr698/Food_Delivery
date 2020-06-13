import { isAuth, POST_USER_SUCCESS, FETCH_USER_DATA, FETCH_USER_FAILURE, POST_USER_DATA, POST_USER_FAILURE } from './actionTypes'
import axios from 'axios'
export const checkAuth = payload => ({
    type: isAuth,
    data: payload
});
export const fetch_user = payload => ({
    type: FETCH_USER_DATA,
    payload
});


export const fetch_failure = payload => ({
    type: FETCH_USER_FAILURE,
    payload
});

export const fetchUserData = payload => dispatch => {
    dispatch(fetch_user())
    return axios({
        method: 'POST',
        url: 'http://127.0.0.1:5000/user/login',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        data: payload
    })
        .then(res => dispatch(checkAuth(res.data.token)))
        .catch(err => dispatch(fetch_failure(err)))
}

export const post_user = payload => ({
    type: POST_USER_DATA,
    payload
});


export const post_failure = payload => ({
    type: POST_USER_FAILURE,
    payload
});
export const post_success = payload => ({
    type: POST_USER_SUCCESS,
    payload
});

export const postUserData = payload => dispatch => {
    dispatch(post_user())
    return axios({
        method: 'POST',
        url: 'http://127.0.0.1:5000/user/register',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        data: payload
    })
        .then(res => dispatch(post_success(res)))
        .catch(err => dispatch(post_failure(err)))
}