import {
    isAuth,
    FETCH_USER_DATA,
    FETCH_USER_FAILURE,
    POST_USER_SUCCESS,
    POST_USER_DATA,
    POST_USER_FAILURE,
    FETCH_HOTEL_SUCCESS,
    FETCH_ITEMS_SUCCESS,
    ADD_ITEMS,
    MINUS_ITEMS,
    GETPAY
} from './actionTypes'


export const initState = {
    is_auth: false,
    isloading: false,
    iserror: false,
    isregister: false,
    res_name: "",
    res: [],
    item: [],
    cart: [],
    amount: "0"
};

export default (state, { type, payload, name }) => {
    console.log(type, payload, name);
    switch (type) {
        case isAuth:
            return {
                ...state,
                is_auth: !state.isAuth
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
        case FETCH_HOTEL_SUCCESS:
            return {
                ...state,
                res: payload
            }

        case FETCH_ITEMS_SUCCESS:
            let item_arr = []
            for (let i = 0; i < payload.length; i++) {
                let items = payload[i]
                let a = {
                    "id": items[3],
                    "name": items[0],
                    "price": items[1],
                    "img": items[2],
                    "quantity": 0
                }
                item_arr.push(a)
            }

            console.log(name)

            return {
                ...state,
                res_name: name,
                item: item_arr
            }
        case ADD_ITEMS:
            let add = []
            let add_amt = Number(state.amount)
            for (let i = 0; i < state.item.length; i++) {
                let items = state.item[i]
                if (items.id === payload) {
                    items.quantity = items.quantity + 1
                    add_amt = add_amt + (Number(items.price))
                }
                add.push(items)
            }
            console.log(add)
            return {
                ...state,
                item: add,
                amount: add_amt
            }
        case MINUS_ITEMS:
            let minus_item = []
            let minus_amt = Number(state.amount)
            for (let i = 0; i < state.item.length; i++) {
                let items = state.item[i]
                if (items.id === payload) {
                    items.quantity = items.quantity - 1
                    minus_amt = minus_amt - (Number(items.price))
                }
                minus_item.push(items)
            }
            return {
                ...state,
                item: minus_item,
                amount: minus_amt
            }

        case GETPAY:
            let final = []
            for (let i = 0; i < state.item.length; i++) {
                let items = state.item[i]
                if (items.quantity > 0) {
                    final.push(items)
                }
            }
            return {
                ...state,
                cart: final
            }

        default:
            return state;
    }
};