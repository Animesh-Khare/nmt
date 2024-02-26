import { GetTokenResponse, GetUserInfoResponse } from '@app-types/Responses.types'

interface AuthenticationState {
    getTokenLoading: boolean
    getTokenData: GetTokenResponse | null
    getTokenError: any

    getUserInfoLoading: boolean
    getUserInfoData: GetUserInfoResponse | null
    getUserInfoError: any
}

export type { AuthenticationState }
