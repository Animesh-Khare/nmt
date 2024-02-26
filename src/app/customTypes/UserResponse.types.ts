interface UserRequestParams {
    searchkey: string
    Name: string
    Email: string
    Autherization: string
    searchrole: string
    Keyproperty: string
    isAscending: boolean
    pagenumber: number
}

interface RoleType {
    userrolename: string
    roleid: number
}
 
interface userdisplay {
    idUser: number
    fullName: string
    email: string
    authorization: string
    roleId: number
    active: boolean
    workSpace: string
    workspaceId: number
    userRoles: string
    userrole: RoleType[]
}

interface UserApiResponse {
    userdisplays: userdisplay[]
    totalPages: number
    count: number
}

interface UserPostParams {
    fullName: string
    email: string
    roleId: number
    message: string
    roles: number[]
}

interface UserEditParams {
    idUser: number
    fullName: string
    email: string
    roleId: number
    message: string
    roles: number[]
}

// interface PostUserRoles {
//     role: number
// }

interface UserRoleResponse {
    id: number
    name: string
}

interface OptionType{
    label: string
    value: number
}

export type { UserRequestParams, UserApiResponse, userdisplay, UserPostParams, UserRoleResponse, RoleType , OptionType,UserEditParams}
