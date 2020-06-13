import { createStore, applyMiddleware } from "redux";
import reducer, { initState } from "./reducer";


const thunk = store => next => action => {
    typeof action === "function" ? action(store.dispatch) : next(action)
}

export const store = createStore(reducer, initState, applyMiddleware(thunk));