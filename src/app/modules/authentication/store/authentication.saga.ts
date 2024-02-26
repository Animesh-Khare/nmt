import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects'
import { AnyAction } from 'redux'
import { handleNotification, handleExistingAuthentication } from '@store/generalStore/general.slice'

import AuthenticationService from '@api/AuthenticationService'
import {
    getToken,
    getTokenSuccess,
    getTokenFailure,

    userInfoHandler,
    userInfoHandlerSuccess,
    userInfoHandlerFailure,
} from '@authentication/store/authentication.slice'
import { GetTokenResponse, GetUserInfoResponse } from '@app-types/Responses.types'

function* watchGetToken(
    action: ReturnType<typeof getToken>
): Generator<CallEffect<GetTokenResponse> | PutEffect<AnyAction>, void, GetTokenResponse> {
    const { redirectUrl, code } = action.payload
    try {
        const response = yield call(AuthenticationService.getToken, redirectUrl, code)
        yield put(getTokenSuccess(response))
        yield put(userInfoHandler())
    } catch (error) {
        yield put(getTokenFailure(error)) 
    }
}
 
function* watchUserInfoHandler(
    action: ReturnType<typeof userInfoHandler>
): Generator<CallEffect<GetUserInfoResponse> | PutEffect<AnyAction>, void, GetUserInfoResponse> {
    try {
        const response = yield call(AuthenticationService.getUserinfo)
        yield put(userInfoHandlerSuccess(response))
        localStorage.setItem('NM-AD', `${response.user.roleId}`)
        localStorage.setItem('user name', `${response.user.fullName}`)

        if (!response?.isFound) {
            yield put( 
                handleNotification({
                    variant: 'error',
                    message: 'Oh snap!',
                    info: 'You dont have Permissions for NSL',
                })
            )

        } else {
            yield put(handleExistingAuthentication(200))
        }
    } catch (error) {
        yield put(userInfoHandlerFailure(error))
        yield put(
            handleNotification({
                variant: 'error',
                message: 'Oh snap!',
                info: 'You do not have a user. Contact your administrator',
            })
        )
    }
}

const authenticationSaga = [takeLatest(getToken, watchGetToken), takeLatest(userInfoHandler, watchUserInfoHandler)]

export default authenticationSaga
