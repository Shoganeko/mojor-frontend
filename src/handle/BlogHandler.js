import { authApi, api, base } from "./Api";
import { isSignedIn } from "./AccountHandler";

/**
 * Get blogs.
 */
export const getBlogs = async () => {
    return await api.get("/blogs?emotes=true")
}

/**
 * Delete a blog by it's ID.
 * @param {*} id The blog's ID.
 */
export const deleteBlog = async (id) => {
    if (!isSignedIn())
        return null

    return await authApi.delete(`/blogs/${id}`)
}

/**
 * Get a blog by it's ID
 * @param id
 */
export const getBlog = async (id) => {
    return await api.get(`${base}/blogs/${id}?emotes=true`)
}