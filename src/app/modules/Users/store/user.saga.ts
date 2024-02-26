import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects'
import { AnyAction } from 'redux'

import UsersService from '@api/UsersService'
import {
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
    handleDeleteUser,
    handleDeleteUserSucess,
    handleDeleteUserFailure,
    handleUserMobileData,
} from '@users/store/user.slice'
import { handleNotification } from '@store/generalStore/general.slice'

import {
    UserApiResponse,
    UserPostParams,
    UserRoleResponse,
    UserEditParams,
    UserRequestParams,
} from '@app-types/UserResponse.types'
import { map } from 'lodash'

function* watchHandleUserData(
    action: ReturnType<typeof handleUser>
): Generator<CallEffect<UserRequestParams> | PutEffect<AnyAction>, void, UserApiResponse> {
    try {
        const response = yield call(UsersService.getUserData, action.payload)

        const newres = response.userdisplays.map((item) => {
            const data = {
                idUser: item.idUser,
                fullName: item.fullName,
                email: item.email,
                authorization: item.authorization,
                roleId: item.roleId,
                active: item.active,
                workSpace: item.workSpace,
                workspaceId: item.workspaceId,
                userRoles: map(item.userrole, 'userrolename').join(', '),
                userrole: item.userrole,
            }
            return data
        })

        const apiResponse: UserApiResponse = {
            userdisplays: newres,
            totalPages: response.totalPages,
            count: response.count,
        }

        yield put(handleUserSucess(apiResponse))
    } catch (error: any) {
        yield put(handleUserFailure(error))
    }
}

function* watchAddHandleUserData(
    action: ReturnType<typeof handleAddUser>
): Generator<CallEffect<UserPostParams> | PutEffect<AnyAction>, void, never> {
    try {
        const userParam = action.payload
        const resp: any = yield call(UsersService.postUserData, userParam)

        yield put(handleAddUserSucess())
        yield put(handleUserMobileData([]))
        const userRequestParam: UserRequestParams = {
            searchkey: '',
            Name: '',
            Email: '',
            Autherization: '',
            searchrole: '',
            Keyproperty: 'Name',
            isAscending: true,
            pagenumber: 1,
        }

        yield put(handleUser(userRequestParam))
        // if (resp.message.includes('User already present'))
        yield put(
            handleNotification({
                variant: `${resp.message.includes('User already present') ? 'error' : 'success'}`,
                message: `${resp.message.includes('User already present') ? 'Oh snap!' : 'Well done!'}`,
                info: `${resp.message.includes('User already present') ? resp.message : 'User Created sucessfully'}`,
            })
        )
    } catch (error) {
        yield put(handleAddUserFailure(error))
        yield put(
            handleNotification({
                variant: 'error',
                message: 'Oh snap!',
                info: 'User Creation failed, seems something went wrong',
            })
        )
    }
}

function* watchHandleUserRole(
    action: ReturnType<typeof handleUserRole>
): Generator<CallEffect<UserRoleResponse[]> | PutEffect<AnyAction>, void, UserRoleResponse[]> {
    try {
        const response = yield call(UsersService.getUserRole)
        yield put(handleUserRoleSucess(response))
    } catch (error: any) {
        yield put(handleUserRoleFailure(error))
    }
}

function* watchHandleEditUser(
    action: ReturnType<typeof handleEditUser>
): Generator<CallEffect<UserEditParams> | PutEffect<AnyAction>, void, never> {
    try {
        const { idUser, ...requestBody } = action.payload
        yield call(UsersService.editUserData, requestBody, idUser)
        yield put(handleEditUserSucess())
        yield put(handleUserMobileData([]))
        const userRequestParam: UserRequestParams = {
            searchkey: '',
            Name: '',
            Email: '',
            Autherization: '',
            searchrole: '',
            Keyproperty: 'Name',
            isAscending: true,
            pagenumber: 1,
        }
        yield put(handleUser(userRequestParam))
        yield put(
            handleNotification({
                variant: 'success',
                message: 'Well done!',
                info: 'User details has been edited sucessfully',
            })
        )
    } catch (error) {
        yield put(handleEditUserFailure(error))
        yield put(
            handleNotification({
                variant: 'error',
                message: 'Oh snap!',
                info: 'User edid failed, seems something went wrong',
            })
        )
    }
}

function* watchHandleDeleteUser(
    action: ReturnType<typeof handleDeleteUser>
): Generator<CallEffect<number> | PutEffect<AnyAction>, void, never> {
    try {
        yield call(UsersService.deleteUser, action.payload)
        yield put(handleDeleteUserSucess())
        yield put(handleUserMobileData([]))
        const userRequestParam: UserRequestParams = {
            searchkey: '',
            Name: '',
            Email: '',
            Autherization: '',
            searchrole: '',
            Keyproperty: 'Name',
            isAscending: true,
            pagenumber: 1,
        }
        yield put(handleUser(userRequestParam))
        yield put(
            handleNotification({
                variant: 'warning',
                message: 'Well done!',
                info: 'User has been disabled sucessfully',
            })
        )
    } catch (error) {
        yield put(handleDeleteUserFailure(error))
        yield put(
            handleNotification({
                variant: 'error',
                message: 'Oh snap!',
                info: 'User delete failed, seems something went wrong',
            })
        )
    }
}

const usersSaga = [
    takeLatest(handleUser, watchHandleUserData),
    takeLatest(handleAddUser, watchAddHandleUserData),
    takeLatest(handleUserRole, watchHandleUserRole),
    takeLatest(handleEditUser, watchHandleEditUser),
    takeLatest(handleDeleteUser, watchHandleDeleteUser),
]

export default usersSaga
