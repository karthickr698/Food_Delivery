import {
    isAuth,
    POST_USER_SUCCESS,
    FETCH_USER_DATA,
    FETCH_USER_FAILURE,
    POST_USER_DATA,
    POST_USER_FAILURE,
    FETCH_HOTEL_DATA,
    FETCH_HOTEL_FAILURE,
    FETCH_HOTEL_SUCCESS,
    FETCH_ITEMS_DATA,
    FETCH_ITEMS_FAILURE,
    FETCH_ITEMS_SUCCESS,
    ADD_ITEMS,
    MINUS_ITEMS,
    GETPAY
} from './actionTypes'
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
        url: 'https://karthick-food-delivery-server.herokuapp.com/user/login',
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
        url: 'https://karthick-food-delivery-server.herokuapp.com/user/register',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        data: payload
    })
        .then(res => dispatch(post_success(res)))
        .catch(err => dispatch(post_failure(err)))
}

export const fetch_hotel = () => ({
    type: FETCH_HOTEL_DATA,
});


export const fetch_hotel_failure = payload => ({
    type: FETCH_HOTEL_FAILURE,
    payload
});
export const fetch_hotel_success = payload => ({
    type: FETCH_HOTEL_SUCCESS,
    payload
});

export const fetchHotel = () => dispatch => {
    dispatch(fetch_hotel())
    return axios.get("https://karthick-food-delivery-server.herokuapp.com/restaurant")
        .then(res => res.data.Restaurants)
        .then(res => dispatch(fetch_hotel_success(res)))
        .catch(err => dispatch(fetch_hotel_failure(err)))
}

export const fetch_item = payload => ({
    type: FETCH_ITEMS_DATA,
    payload
});


export const fetch_item_failure = payload => ({
    type: FETCH_ITEMS_FAILURE,
    payload
});
export const fetch_item_success = (payload, name) => ({
    type: FETCH_ITEMS_SUCCESS,
    payload,
    name
});

export const fetchItem = (payload, name) => dispatch => {
    dispatch(fetch_item())
    return axios.get("https://karthick-food-delivery-server.herokuapp.com/restaurant/" + payload)
        .then(res => res.data.Restaurants)
        .then(res => dispatch(fetch_item_success(res, name)))
        .catch(err => dispatch(fetch_item_failure(err)))
}

export const addItems = payload => {
    return {
        type: ADD_ITEMS,
        payload
    }
}

export const minusItems = payload => {
    return {
        type: MINUS_ITEMS,
        payload
    }
}

export const getPay = () => {
    return {
        type: GETPAY
    }
}




