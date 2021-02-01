import React, { createContext, useContext, useReducer } from "react";

const stateContext = createContext();

export const initialstate = {
    user: User()

}
function User() {
    const state = JSON.parse(window.localStorage.getItem("user"));
    return state === null ? null : state.user
}

export const StateProvider = ({ reducer, children }) => {
    return (
        <stateContext.Provider value={useReducer(reducer, initialstate)}>
            { children}
        </stateContext.Provider >
    );
}

export const useStateValue = () => useContext(stateContext);
