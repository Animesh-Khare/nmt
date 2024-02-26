import { GET, POST } from '@api/ApiService'

import {
    ContactRequestParams,
    PostContactBodyParams,
    PostContactPersonReactivateParam,
} from '@app-types/ContactResponse.types'

const BASE_URL = process.env.REACT_APP_BASE_API_URL

const urlFactory = {
    getContactData: () => `${BASE_URL}/api/v1/Contactperson?pagesize=10`,
    getFunctionClassification: () => `${BASE_URL}/api/v1/Action/functionclassification`,
    getFunctionLevel: () => `${BASE_URL}/api/v1/Action/functionlevel`,
    getHoldings: () => `${BASE_URL}/api/v1/Action/Holdings`,
    getGender: () => `${BASE_URL}/api/v1/Action/Gender`,
    postContactData: () => `${BASE_URL}/api/v1/Contactperson`,
    postReactivateContactPerson: (clientid: number | null, Inactive: boolean) =>
        `${BASE_URL}/api/v1/Contactperson/Inactive?clientid=${clientid}&Inactive=${Inactive}`,
    // postReactivateContactPerson: () =>
    // `${BASE_URL}/api/v1/Contactperson/Inactive`,
}

const ContactService = {
    getContactData: async (requestParam: ContactRequestParams) => {
        return GET(urlFactory.getContactData(), requestParam)
    },
    getFunctionClassification: async () => {
        return GET(urlFactory.getFunctionClassification())
    },
    getFunctionLevel: async () => {
        return GET(urlFactory.getFunctionLevel())
    },
    getHoldings: async () => {
        return GET(urlFactory.getHoldings())
    },
    getGender: async () => {
        return GET(urlFactory.getGender())
    },
    postContactData: async (bodyParam: PostContactBodyParams) => {
        return POST(urlFactory.postContactData(), bodyParam)
    },
    postReactivateContactPerson: async (bodyParam: PostContactPersonReactivateParam) => {
        const { clientid, Inactive } = bodyParam
   
        // return POST(urlFactory.poostReactivateContactPerson(clientid, Inactive))
        return POST(urlFactory.postReactivateContactPerson(clientid, Inactive), bodyParam)
    },
}

export default ContactService
