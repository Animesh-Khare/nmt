import { UserApiResponse, UserRoleResponse, userdisplay } from '@app-types/UserResponse.types'

interface UserState {
    userLoading: boolean
    userData: UserApiResponse | null
    userError: any
    userRoleData: UserRoleResponse[] | null
    userRoleLoading: boolean
    userRoleError: any
    addUserLoading: boolean,
    deleteUserLoading: boolean,
    editUserLoading: boolean,
    userMobileData: userdisplay[]
}

export type { UserState }
