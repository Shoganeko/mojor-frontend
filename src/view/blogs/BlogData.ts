export type BlogData = {
    id: string,
    creator: string,
    date: number,
    title: string,
    body: string
}

export type UserData = {
    username: string,
    permissions: []
    id: string,
    createdOn: number
}

export type BlogResponse = {
    blog: BlogData;
    user: UserData
}