import { GET, POST, PUT } from '@api/ApiService'
// import { UserRequestParams, UserPostParams } from '@app-types/UserResponse.types'
import {
    OrganizationRequestParams,
    PostOrganizationBodyParam,
    OrganisationOverviewCompanyDetailsRequestParams,
    PutOrganisationalDataParam,
    PutOrganisationAddressParam,
    OrganisationTimelineRequestParam,
    PostOrganisationTimelineBodyParam,
    AddCommentOrganisationTimelineBodyParam,
    zipcodeRequestParam,
} from '@app-types/OrganisationResponse.types'

const BASE_URL = process.env.REACT_APP_BASE_API_URL

const urlFactory = {
    getOrganisationData: () => `${BASE_URL}/api/v1/Organization?pagesize=10`,
    getCountry: () => `https://restcountries.com/v3.1/all?fields=name`,
    getCountryApi: () => `${BASE_URL}/api/v1/Action/Country`,

    getZipData: (zipcode: string, houseNo: number) => `${BASE_URL}/api/v1/Action/Zipcodes/${zipcode}/${houseNo}`,

    postOrganiization: () => `${BASE_URL}/api/v1/Organization`,
    getStakeholder: () => `${BASE_URL}/api/v1/Action/Stackholder`,
    // postUserData: () => `${BASE_URL}/api/v1/User/add/users`,
    // editUserData: (userId:number) => `${BASE_URL}/api/v1/User/Update?Id=${userId}`,
    // getUserRole: () => `${BASE_URL}/api/v1/Action/roles`,
    getOrganisationOverviewData: (sendParams: OrganisationOverviewCompanyDetailsRequestParams) =>
        `${BASE_URL}/api/v1/Organization/Info/Organization?id=${sendParams.id}`,
    getOrganisationContactInfoDetails: (sendParams: OrganisationOverviewCompanyDetailsRequestParams) =>
        `${BASE_URL}/api/v1/Organization/${sendParams.id}`,
    editOrganisationalModalData: (id: number) => `${BASE_URL}/api/v1/Organization/${id}`,
    editOrganisationalAddressModalData: () => `${BASE_URL}/api/v1/Organization/Address`,
    getOrganisationTimeline: () => `${BASE_URL}/api/v1/timeline`,
    postOrganisationTimeline: () => `${BASE_URL}/api/v1/timeline`,
    addCommentOrganisationTimeline: () => `${BASE_URL}/api/v1/timeline/Comment`,
}

const OrganisationService = {
    getOrganisationData: async (requestParam: OrganizationRequestParams) => {
        return GET(urlFactory.getOrganisationData(), requestParam)
    },

    getCountry: async () => {
        return GET(urlFactory.getCountry())
    },

    getCountryApi: async () => {
        return GET(urlFactory.getCountryApi())
    },

    getZipData: async (requestParams: zipcodeRequestParam) => {
        return GET(urlFactory.getZipData(requestParams.zipcode, requestParams.houseNo))
    },

    postOrganiization: async (bodyParam: PostOrganizationBodyParam) => {
        return POST(urlFactory.postOrganiization(), bodyParam)
    },

    getStakeholder: async () => {
        return GET(urlFactory.getStakeholder())
    },

    // postUserData: async (postParam: UserPostParams) => {
    //     return POST(urlFactory.postUserData(), postParam)
    // },
    // editUserData: async (postParam: UserPostParams,userId:number) => {
    //     return PUT(urlFactory.editUserData(userId), postParam)
    // },
    // getUserRole: async ()=>{
    //     return GET(urlFactory.getUserRole())
    // }
    getOrganisationOverviewData: async (sendParams: OrganisationOverviewCompanyDetailsRequestParams) => {
        return GET(urlFactory.getOrganisationOverviewData(sendParams))
    },

    getOrganisationContactInfoDetails: async (sendParams: OrganisationOverviewCompanyDetailsRequestParams) => {
        return GET(urlFactory.getOrganisationContactInfoDetails(sendParams))
    },

    editOrganisationalModalData: async (requestBody: PutOrganisationalDataParam) => {
        const { id, ...requestBodyData } = requestBody
        return PUT(urlFactory.editOrganisationalModalData(id), requestBodyData)
    },

    editOrganisationalAddressModalData: async (requestBody: PutOrganisationAddressParam) => {
        return PUT(urlFactory.editOrganisationalAddressModalData(), requestBody)
    },
    getOrganisationTimeline: async (bodyParam: OrganisationTimelineRequestParam) => {
        return GET(urlFactory.getOrganisationTimeline(), bodyParam)
    },
    postOrganisationTimeline: async (bodyParam: PostOrganisationTimelineBodyParam) => {
        return POST(urlFactory.postOrganisationTimeline(), bodyParam)
    },
    addCommentOrganisationTimeline: async (bodyParam: AddCommentOrganisationTimelineBodyParam) => {
        return POST(urlFactory.addCommentOrganisationTimeline(), bodyParam)
    },
}
export default OrganisationService
