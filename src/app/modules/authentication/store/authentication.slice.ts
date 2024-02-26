import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { GetTokenResponse, GetTokenRequest, GetUserInfoResponse } from '@app-types/Responses.types'
import { AuthenticationState } from '@authentication/store/authentication.types'
import { setWithExpiry, removeItem } from '@shared/services/LocalStorage'

const initialState: AuthenticationState = {
    getTokenLoading: false,
    getTokenData: null,
    getTokenError: null,

    getUserInfoLoading: false,
    getUserInfoData: null,
    getUserInfoError: null,
}

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        getToken(state, action: PayloadAction<GetTokenRequest>) {
            state.getTokenLoading = true
            state.getTokenError = null
        },
        getTokenSuccess(state, action: PayloadAction<GetTokenResponse>) {
            const data = action.payload
            if (data.access_token) {
                setWithExpiry('console_admin_token', data.access_token, data.expires_in * 1000)
            }
            state.getTokenData = data
            state.getTokenLoading = false
            state.getTokenError = null
        },
        getTokenFailure(state, action: PayloadAction<any>) {
            state.getTokenError = action.payload
            state.getTokenLoading = false
        },

        userInfoHandler(state) {
            state.getUserInfoLoading = true
            state.getTokenError = null
        },
        userInfoHandlerSuccess(state, action: PayloadAction<GetUserInfoResponse>) {
            const data = action.payload
            if (!data.isFound) {
                removeItem('console_admin_token')
                state.getTokenData = null
            }

            state.getUserInfoData = data
            state.getUserInfoLoading = false
            state.getUserInfoError = null
        },
        userInfoHandlerFailure(state, action: PayloadAction<any>) {
            state.getUserInfoError = action.payload
            state.getUserInfoLoading = false
        },
    },
})

export const {
    getToken,
    getTokenSuccess,
    getTokenFailure,
    userInfoHandler,
    userInfoHandlerSuccess,
    userInfoHandlerFailure,
} = authenticationSlice.actions
export default authenticationSlice.reducer
