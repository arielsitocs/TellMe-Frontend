interface UserDataTypes {
    image?: any
    firstName: string
    lastName: string
    description: string
    posts: number
    followers: number
    following: number
    state?: boolean
    setState?: (state: boolean) => void
}

export default UserDataTypes;