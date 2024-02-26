import { GET } from '@api/ApiService'

const BASE_URL = process.env.REACT_APP_BASE_API_URL

const urlFactory = {
    getToken: () => `${BASE_URL}/api/v1/Token`,
    getUserinfo: () => `${BASE_URL}/UserInfo`,
}

const AuthenticationService = {
    getToken: async (redirectUrl: string, code: string) => {
        const params = {
            redirect_uri: redirectUrl,
            code,
        }
        const authRequired = false
        return GET(urlFactory.getToken(), params, authRequired)
    },
    getUserinfo: async () => {
        return GET(urlFactory.getUserinfo())
    },
} 

export default AuthenticationService
