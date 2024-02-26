import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from '@users/store/user.types'
import { UserApiResponse, UserRequestParams, UserPostParams, UserRoleResponse,UserEditParams, userdisplay } from '@app-types/UserResponse.types'


const initialUser: UserState = {
    userLoading: false,
    userData: null,
    userError: null, 

    userRoleData:null,
    userRoleLoading:false,
    userRoleError: null,

    addUserLoading: false,
    deleteUserLoading: false,
    editUserLoading: false,
    userMobileData: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUser,
    reducers: {
        handleUser(state, action: PayloadAction<UserRequestParams>) {
            state.userLoading = true
            state.userError = null
        },
        handleUserSucess(state, action: PayloadAction<UserApiResponse>) {
            state.userData = action.payload
            state.userLoading = false
            state.userError = null
        },
        handleUserFailure(state, action: PayloadAction<any>) {
            state.userError = action.payload
            state.userLoading = false
        },


        handleUserRole(state){
            state.userRoleLoading=true
            state.userRoleError=null
        },
        handleUserRoleSucess(state, action: PayloadAction<UserRoleResponse[]>){
            state.userRoleLoading=true
            state.userRoleData=action.payload
        },
        handleUserRoleFailure(state,action: PayloadAction<any>){
            state.userRoleError = action.payload
            state.userRoleLoading = false
        },


        // add user

        handleAddUser(state, action: PayloadAction<UserPostParams>) {
            state.addUserLoading = true
            state.userError = null
            state.userMobileData = []
        },
        handleAddUserSucess(state) {
            state.addUserLoading = false
            state.userError = null
        },
        handleAddUserFailure(state, action: PayloadAction<any>) {
            state.addUserLoading = false
            state.userError = action.payload
        },

        // delete user

        handleDeleteUser(state, action: PayloadAction<number>) {
            state.deleteUserLoading = true
            state.userError = null
        },
        handleDeleteUserSucess(state) {
            state.deleteUserLoading = false
            state.userError = null
        },
        handleDeleteUserFailure(state, action: PayloadAction<any>) {
            state.deleteUserLoading = false
            state.userError = action.payload
        },

        // edit user

        handleEditUser(state, action: PayloadAction<UserEditParams>) {
            state.editUserLoading = true
            state.userError = null
        },
        handleEditUserSucess(state) {
            state.editUserLoading = false
            state.userError = null
        },
        handleEditUserFailure(state, action: PayloadAction<any>) {
            state.editUserLoading = false
            state.userError = action.payload
        },



        // handleUserManipulation(state, action: PayloadAction<userdisplay[]>) {
        //     if (state.userData) {
        //         state.userData.userdisplays = action.payload
        //     }
        // },

        // handleUserManipulationMobile(state, action: PayloadAction<userdisplay[]>) {
        //     if (state.userMobileData) {
        //         state.userMobileData = action.payload
        //     }
        // },

        handleUserMobileData(state, action: PayloadAction<userdisplay[]>) {
          //  debugger;
            if (action.payload.length === 0) {
                state.userMobileData = []
            } else {
                state.userMobileData = [...state.userMobileData, ...action.payload]
            }
        },
    }, 
})

export const {
    handleUser,
    handleUserSucess,
    handleUserFailure,
    handleAddUser,
    handleAddUserSucess,
    handleAddUserFailure,
    handleUserRole,
    handleUserRoleSucess,
    handleUserRoleFailure,
    handleEditUser,
    handleEditUserSucess,
    handleEditUserFailure,
    handleUserMobileData,
    handleDeleteUser,
    handleDeleteUserSucess,
    handleDeleteUserFailure
} = userSlice.actions

export default userSlice.reducer
