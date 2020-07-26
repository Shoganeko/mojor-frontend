import { LOG_IN, LOG_OUT, CHANGE_USERNAME, CHANGE_PASSWORD } from "../actions/auth.actions";

let defaultState = {
    isLoggedIn: false,
    token: "",
    expire: -1,
    user: {
        username: "",
        id: "-1",
        permissions: "[]",
        createdOn: "-1"
    },
};

/**
 * Save the state.
 */
const saveState = (state) => {
    let json = JSON.stringify(state)

    localStorage.setItem("selfState", json)
}

/**
 * The inital state for an auth
 */
const getInitialState = () => {
    let local = localStorage.getItem("selfState")

    if (local !== null && local !== "" && local !== undefined)
        return JSON.parse(local)

    return defaultState
}


/**
 * Stores the user's name.
 * @param {*} state
 * @param {*} action
 */
const auth = (state = getInitialState(), action) => {
    switch (action.type) {
        case LOG_IN: {
            const { token, user, expire } = action.payload

            let newState = {
                ...state,
                isLoggedIn: true,
                expire,
                token,
                user
            }

            saveState(newState)

            return newState
        }

        case LOG_OUT: {
            let newState = defaultState

            saveState(defaultState)

            return newState
        }

        case CHANGE_USERNAME: {
            const { username } = action.payload

            let newState = {
                ...state,
                username
            }

            saveState(newState)

            return newState
        }

        case CHANGE_PASSWORD: {
            const { password } = action.payload

            let newState = {
                ...state,
                password
            }

            saveState(newState)

            return newState
        }

        default: {
            return state;
        }
    }
};

export default auth;
