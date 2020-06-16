import {base} from "./Api";
import {getToken} from "./AccountHandler";

/**
 * Get blogs.
 * @param callback
 */
export const getBlogs = (callback) => {
    fetch(`${base}/blogs?emotes=true`, {
        method: 'GET'
    })
        .then((response) => response.json().then((json) => callback(json)))
        .catch((response) => {
            console.log(response);
            console.log("Fuck you ")
            callback(null)
        })
}

/**
 * Delete a blog.
 * @param id
 */
export const deleteBlog = (id, callback) => {
    fetch(`${base}/blogs/${id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `bearer ${getToken()}`
        }
    })
        .then((response) => callback(response.ok))
        .catch(() => callback(false))
}

/**
 * Get a blog by it's ID
 * @param id
 * @param callback
 */
export const getBlog = (id, callback) => {
    fetch(`${base}/blogs/${id}?emotes=true`)
        .then((response) => {
            if (response.ok) {
                response.json()
                    .then((json) => callback(json))
            } else
                callback(null)
        })
        .catch(() => callback(null))
}

/**
 * Add a tag to a blog.
 * @param id
 * @param tag
 * @param callback
 */
export const addBlogTag = (id, tag, callback) => {
    let form = new FormData()

    form.append("name", tag)

    fetch(`${base}/blogs/${id}/tags`, {
        method: 'POST',
        body: form,
        headers: {
            "Authorization": `bearer ${getToken()}`
        }
    })
        .then((response) => callback(response.ok))
        .catch(() => callback(false))
}

/**
 * Remove a tag to a blog.
 * @param id
 * @param tag
 * @param callback
 */
export const removeBlogTag = (id, tag, callback) => {
    let form = new FormData()

    form.append("name", tag)

    fetch(`${base}/blogs/${id}/tags`, {
        method: 'DELETE',
        body: form,
        headers: {
            "Authorization": `bearer ${getToken()}`
        }
    })
        .then((response) => callback(response.ok))
        .catch(() => callback(false))
}
