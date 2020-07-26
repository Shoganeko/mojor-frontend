export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export const CHANGE_USERNAME = "CHANGE_USERNAME"
export const CHANGE_PASSWORD = "CHANGE_PASSWORD"

/**
 * Login
 * @param {*} token 
 * @param {*} name 
 * @param {*} id 
 */
export const logIn = (token, user, expire) => ({
    type: LOG_IN,
    payload: {
        token,
        user,
        expire
    }
});

/**
 * Log out.
 */
export const logOut = () => ({
    type: LOG_OUT,
    payload: {}
})

/**
 * Change the username.
 * @param {*} username 
 */
export const changeUsername = (username) => ({
    type: CHANGE_USERNAME,
    payload: { username }
})

/**
 * Change the password.
 * @param {*} password 
 */
export const changePassword = (password) => ({
    type: CHANGE_PASSWORD,
    payload: { password }
})