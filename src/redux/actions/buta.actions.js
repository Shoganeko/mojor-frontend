export const LOG_IN = "BUTA_LOG_IN"
export const LOG_OUT = "BUTA_LOG_OUT"

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