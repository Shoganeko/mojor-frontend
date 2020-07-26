import { LOG_IN, LOG_OUT } from "../actions/buta.actions"

let defaultState = {
    isLoggedIn: false,
    token: "",
    expire: -1,
    user: {
        id: "",
        username: "",
        discriminator: "",
        avatar: ""
    },
};

/**
 * Save the state.
 */
const saveState = (state) => {
    let json = JSON.stringify(state);

    localStorage.setItem("discordState", json);
};

/**
 * The inital state for an auth
 */
const getInitialState = () => {
    let local = localStorage.getItem("discordState");

    if (local !== null && local !== "" && local !== undefined)
        return JSON.parse(local);

    return defaultState;
};

/**
 * Store buta's data.
 * @param {*} state
 * @param {*} action
 */
const auth = (state = getInitialState(), action) => {
    switch (action.type) {
        case LOG_IN: {
            const { token, user, expire } = action.payload;

            let newState = {
                ...state,
                isLoggedIn: true,
                expire,
                token,
                user,
            };

            saveState(newState);

            return newState;
        }

        case LOG_OUT: {
            let newState = defaultState;

            saveState(defaultState);

            return newState;
        }

        default: {
            return state;
        }
    }
};

export default auth;
