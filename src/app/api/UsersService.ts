import { GET, POST, PUT, DELETE } from '@api/ApiService'
import { UserRequestParams, UserPostParams } from '@app-types/UserResponse.types'

const BASE_URL = process.env.REACT_APP_BASE_API_URL

const urlFactory = {
    getUserData: () => `${BASE_URL}/api/v1/User?pagesize=10`,
    postUserData: () => `${BASE_URL}/api/v1/User/add/users`,
    editUserData: (userId:number) => `${BASE_URL}/api/v1/User/Update?Id=${userId}`,
    getUserRole: () => `${BASE_URL}/api/v1/Action/roles`,
    deleteUser: (idUser:number) => `${BASE_URL}/api/v1/User/Delete?Id=${idUser}`
}

const UsersService = {
    getUserData: async (requestParam: UserRequestParams) => {
        return GET(urlFactory.getUserData(), requestParam)
    },

    postUserData: async (postParam: UserPostParams) => {
        return POST(urlFactory.postUserData(), postParam)
    },
    editUserData: async (postParam: UserPostParams,userId:number) => {
        return PUT(urlFactory.editUserData(userId), postParam)
    },
    getUserRole: async ()=>{
        return GET(urlFactory.getUserRole())
    },
    deleteUser : async(idUser: number) =>{
        return DELETE(urlFactory.deleteUser(idUser))
    }
}

export default UsersService
