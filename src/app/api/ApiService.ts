import axios from 'axios'

import { getWithExpiry } from '@shared/services/LocalStorage'

type ParamType = Record<string, any>
type BodyType = Record<string, any>

const autherizationString = (authRequired: boolean = true): string | undefined => {
    const token = getWithExpiry('console_admin_token')
    return authRequired ? `Bearer ${token}` : undefined
}

const handleResponse = (response: any): any => {
    try {
        const status = parseInt(response.status, 10)
        if (status === 200 || status === 201) {
            return response.data
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const GET = async (url: string, params: ParamType = {}, authRequired: boolean = true): Promise<any> => {
    return axios
        .get(url, {
            params,
            headers: {
                'Content-Type': 'application/json',
                Authorization: autherizationString(authRequired),
            },
        })
        .then((res) => {
            return handleResponse(res)
        })
        .catch((error) => {
            throw error
        })
}

export const POST = async (url: string, body: BodyType): Promise<any> => {
    return axios
        .post(
            url,
            { ...body },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: autherizationString(),
                },
            }
        )
        .then((res) => {
            return handleResponse(res)
        })
        .catch((error) => {
            throw error
        })
}

export const PUT = async (url: string, body: BodyType): Promise<any> => {
    return axios
        .put(
            url,
            { ...body },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: autherizationString(),
                },
            }
        )
        .then((res) => {
            return handleResponse(res)
        })
        .catch((error) => {
            throw error
        })
}

export const DELETE = async (url: string, params: ParamType = {}, authRequired: boolean = true): Promise<any> => {
    return axios
        .delete(
            url,

            {
                params,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: autherizationString(),
                },
            }
        )
        .then((res) => {
            return handleResponse(res)
        })
        .catch((error) => {
            throw error
        })
}
