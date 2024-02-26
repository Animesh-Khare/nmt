import { GET, POST, DELETE } from '@api/ApiService'
import {
    ContactDetailRequestParam,
    ContactTimelineRequestParam,
    OrganisationDetailRequestParam,
    PostContactTimelineBodyParam,
    ContactInfoRequestParams,
    PostPersonalInfoData,
    PostContactDetailData,
    PostFunctionalDetailBodyParam,
    AddFunctionBodyParams,
    EditFunctionBodyParams,
    GetFunctionQueryParams,
    AddCommentTimelineBodyParam,
    PostContactPersonInactiveParam,
} from '@app-types/ContactDetailResponse.types'
import { ContactRequestParams } from '@app-types/ContactResponse.types'

// import { ContactRequestParams, PostContactBodyParams } from '@app-types/ContactResponse.types'

const BASE_URL = process.env.REACT_APP_BASE_API_URL

const urlFactory = {
    getContactDetail: () => `${BASE_URL}/api/v1/Contactperson/Details`,
    getOrganisationDetail: () => `${BASE_URL}/api/v1/Contactperson/organization/Details`,
    getContactTimeline: () => `${BASE_URL}/api/v1/timeline`,
    postContactTimeline: () => `${BASE_URL}/api/v1/timeline`,
    addCommentTimeline: () => `${BASE_URL}/api/v1/timeline/Comment`,
    postInactiveUser: (clientid: number, Inactive: boolean) =>
        `${BASE_URL}/api/v1/Contactperson/Inactive?clientid=${clientid}&Inactive=${Inactive}`,
    deleteContactUser: (idContact: number) => `${BASE_URL}/api/v1/Contactperson?clientid=${idContact}`,
    getContactInfo: () => `${BASE_URL}/api/v1/Contactperson/contactinfo`,
    postPersonalInfo: () => `${BASE_URL}/api/v1/Contactperson/PersonalInformation`,
    postContactDetail: () => `${BASE_URL}/api/v1/Contactperson/ContactDetails`,
    postFunctionalDetail: (idContact: number) =>
        `${BASE_URL}/api/v1/Contactperson/Functiondetails?contactid=${idContact}`,
    getFunctionOverview: (idContact: number, keyproperty: string, searchkey: string, pagenumber: number) =>
        `${BASE_URL}/api/v1/Contactperson/Function/overview?contactid=${idContact}&keyproperty=${keyproperty}&searchkey=${searchkey}&pagesize=5&pagenumber=${pagenumber}`,
    postFunction: () => `${BASE_URL}/api/v1/Contactperson/Newfunction`,
    editFunction: (idContact: number) => `${BASE_URL}/api/v1/Contactperson/Functiondetails?contactid=${idContact}`,
    deleteFunction: (idFunction: number) => `${BASE_URL}/api/v1/Contactperson/${idFunction}/Function`,

    getSecretaryDropdown: () => `${BASE_URL}/api/v1/Contactperson?pagesize=10`,
}

const ContactDetailService = {
    getContactDetail: async (bodyParam: ContactDetailRequestParam) => {
        return GET(urlFactory.getContactDetail(), bodyParam)
    },
  
    getOrganisationDetail: async (bodyParam: OrganisationDetailRequestParam) => {
        return GET(urlFactory.getOrganisationDetail(), bodyParam)
    },

    getContactTimeline: async (bodyParam: ContactTimelineRequestParam) => {
        return GET(urlFactory.getContactTimeline(), bodyParam)
    },

    postContactTimeline: async (bodyParam: PostContactTimelineBodyParam) => {
        return POST(urlFactory.postContactTimeline(), bodyParam)
    },

    addCommentTimeline: async (bodyParam: AddCommentTimelineBodyParam) => {
        return POST(urlFactory.addCommentTimeline(), bodyParam)
    },

    postInactiveUser: async (bodyParam: PostContactPersonInactiveParam) => {
        const { clientid, Inactive } = bodyParam
        return POST(urlFactory.postInactiveUser(clientid, Inactive), { bodyParam })
    },
    deleteContactUser: async (idContact: number) => {
        return DELETE(urlFactory.deleteContactUser(idContact), {})
    },

    getContactInfo: async (bodyParam: ContactInfoRequestParams) => {
        return GET(urlFactory.getContactInfo(), bodyParam)
    },

    postPersonalInfo: async (bodyParam: PostPersonalInfoData) => {
        return POST(urlFactory.postPersonalInfo(), bodyParam)
    },

    postContactDetail: async (bodyParam: PostContactDetailData) => {
        return POST(urlFactory.postContactDetail(), bodyParam)
    },

    postFunctionalDetail: async (bodyParam: PostFunctionalDetailBodyParam) => {
        return POST(urlFactory.postFunctionalDetail(bodyParam.idPerson), bodyParam)
    },

    getFunctionOverview: async (queryParam: GetFunctionQueryParams) => {
        return GET(
            urlFactory.getFunctionOverview(
                queryParam.idContact,
                queryParam.keyproperty,
                queryParam.searchkey,
                queryParam.pagenumber
            ),
            {}
        )
    },

    postFunction: async (bodyParam: AddFunctionBodyParams) => {
        return POST(urlFactory.postFunction(), bodyParam)
    },

    editFunction: async (bodyParam: EditFunctionBodyParams) => {
        return POST(urlFactory.editFunction(bodyParam.idPerson), bodyParam)
    },

    deleteFunction: async (idFunction: number) => {
        return DELETE(urlFactory.deleteFunction(idFunction), {})
    },

    getSecretaryDropdown: async (requestParam: ContactRequestParams) => {
        return GET(urlFactory.getSecretaryDropdown(), requestParam)
    },
}

export default ContactDetailService
