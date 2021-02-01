const reducer = (state, action) => {
    switch (action.type) {
        case "setuser":
            const user = { ...state, user: action.payload }
            window.localStorage.setItem("user", JSON.stringify(user));
            return user;
        case "logout":
            const users = { ...state, user: action.payload }
            window.localStorage.removeItem("user");
            return users;
        default:
            return state;
    }

}

export default reducer;

