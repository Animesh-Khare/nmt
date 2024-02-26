interface GetTokenRequest {
    redirectUrl: string
    code: string
}
interface GetTokenResponse {
    token_type: string
    scope: string
    expires_in: number
    ext_expires_in: number
    access_token: string
}

interface GetUserInfoResponse {
    isFound: true
    message: string
    user: {
        consoleUserId: number
        fullName: string
        email: string
        createdOn: string
        lastLoggedOn: string | null
        roleId: number
        active: boolean
        workspaceId: number
        isAdmin: boolean
    }
}

interface DashboardResponse {
    data: any
}

export type { GetTokenRequest, GetTokenResponse, DashboardResponse, GetUserInfoResponse }
