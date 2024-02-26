import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { UserState } from '@users/store/user.types'
// import { UserApiResponse, UserRequestParams, UserPostParams, UserRoleResponse,UserEditParams, userdisplay } from '@app-types/UserResponse.types'
import {
    OrganizationRequestParams,
    OrganisationApiResponse,
    PostOrganizationBodyParam,
    OrganisationDisplay,
    StakeholderResponse,
    OrganisationOverviewCompanyDetails,
    OrganisationOverviewCompanyDetailsRequestParams,
    OrganisationContactInfoDetails,
    PutOrganisationalDataParam,
    PutOrganisationAddressParam,
    OrganisationTimelineRequestParam,
    OrganisationTimelineApiResp,
    PostOrganisationTimelineBodyParam,
    AddCommentOrganisationTimelineBodyParam,
    CountryResponse,
    zipcodeRequestParam,
    zipDataResponse,
} from '@app-types/OrganisationResponse.types'

import { OrganisationState } from '@organisations/store/organisation.types'

const initialOrganisation: OrganisationState = {
    organisationLoading: false,
    organisationData: null,
    organisationError: null,

    countryData: null,
    countryError: null,
    countryLoading: false,

    zipDataLoading: false,
    zipData: null,
    zipDataError: null,

    postOrganizationLoading: false,
    postOrganizationError: null,

    organisationMobileData: [],

    stakeholderLoading: false,
    stakeholderError: null,
    stakeholderData: null,

    organisationOverviewInfoLoading: false,
    organisationOverviewInfoData: null,
    organisationOverviewInfoError: null,

    OrganisationContactInfoLoading: false,
    OrganisationContactInfoData: null,
    OrganisationContactInfoError: null,

    OrganisationPostContactInfoLoading: false,
    OrganisationPostContactInfoError: null,

    OrganisationPostAddressLoading: false,
    OrganisationPostAddressError: null,

    organisationTimelineLoading: false,
    organisationTimelineData: null,
    organisationTimelineError: null,

    PostOrganisationTimelineLoading: false,
    PostOrganisationTimelineError: null,

    addCommentOrganisationTimelineLoading: false,
    addCommentOrganisationTimelineError: null,

    OrganisationOverviewHead: ' ',
}

const organisationSlice = createSlice({
    name: 'organisation',
    initialState: initialOrganisation,
    reducers: {
        handleOrganisation(state, action: PayloadAction<OrganizationRequestParams>) {
            state.organisationLoading = true
            state.organisationError = null
        },
        handleOrganisationSucess(state, action: PayloadAction<OrganisationApiResponse>) {
            state.OrganisationOverviewHead = ''
            state.organisationData = action.payload
            state.organisationLoading = false
            state.organisationError = null
        },
        handleOrganisationFailure(state, action: PayloadAction<any>) {
            state.organisationError = action.payload
            state.organisationLoading = false
        },

        // country api
        handleCountry(state) {
            state.countryLoading = true
            state.countryData = null
        },
        handleCountrySucess(state, action: PayloadAction<CountryResponse[]>) {
            state.countryData = action.payload
            state.countryLoading = false
        },
        handleCountryFailure(state, action: PayloadAction<any>) {
            state.organisationError = action.payload
            state.organisationLoading = false
        },

        // zip code api
        handleZipCode(state, action: PayloadAction<zipcodeRequestParam>) {
            state.zipDataLoading = true
            state.zipData = null
        },
        handleZipCodeSucess(state, action: PayloadAction<zipDataResponse>) {
            state.zipData = action.payload
            state.zipDataLoading = false
        },
        handleZipCodeFailure(state, action: PayloadAction<any>) {
            state.zipDataError = action.payload
            state.zipDataLoading = false
        },

        // add user
        handlePostOrganization(state, action: PayloadAction<PostOrganizationBodyParam>) {
            state.postOrganizationLoading = true
        },
        handlePostOrganizationSucess(state) {
            state.postOrganizationLoading = false
        },
        handlePostOrganizationError(state, action: PayloadAction<any>) {
            state.postOrganizationLoading = true
            state.postOrganizationError = action.payload
        },

        handleOrganisationMobileData(state, action: PayloadAction<OrganisationDisplay[]>) {
            if (action.payload.length === 0) {
                state.organisationMobileData = []
            } else {
                state.organisationMobileData = [...state.organisationMobileData, ...action.payload]
            }
        },

        handleStakeholder(state) {
            state.stakeholderLoading = true
        },
        handleStakeholderSucess(state, action: PayloadAction<StakeholderResponse[]>) {
            state.stakeholderLoading = false
            state.stakeholderData = action.payload
        },
        handleStakeholderError(state, action: PayloadAction<any>) {
            state.stakeholderLoading = true
            state.stakeholderError = action.payload
        },

        handleOrganisationOverview(state, action: PayloadAction<OrganisationOverviewCompanyDetailsRequestParams>) {
            state.organisationOverviewInfoLoading = true
        },
        handleOrganisationOverviewSuccess(state, action: PayloadAction<OrganisationOverviewCompanyDetails>) {
            state.organisationOverviewInfoLoading = false
            state.organisationOverviewInfoData = action.payload
        },
        handleOrganisationOverviewFailure(state, action: PayloadAction<any>) {
            state.organisationOverviewInfoLoading = true
            state.organisationOverviewInfoError = action.payload
        },

        handleOrganisationContactInfoData(
            state,
            action: PayloadAction<OrganisationOverviewCompanyDetailsRequestParams>
        ) {
            state.OrganisationContactInfoLoading = true
        },
        handleOrganisationContactInfoDataSucess(state, action: PayloadAction<OrganisationContactInfoDetails>) {
            state.OrganisationContactInfoLoading = false
            state.OrganisationContactInfoData = action.payload
        },
        handleOrganisationContactInfoDataFailure(state, action: PayloadAction<any>) {
            state.OrganisationContactInfoLoading = false
            state.OrganisationContactInfoError = action.payload
        },

        handlePostOrganisationContactInfoData(state, action: PayloadAction<PutOrganisationalDataParam>) {
            state.OrganisationPostContactInfoLoading = true
        },
        handlePostOrganisationContactInfoDataSucess(state, action: PayloadAction<any>) {
            localStorage.setItem('OrganisationOverviewHeading', action.payload)
            state.OrganisationOverviewHead = action.payload

            state.OrganisationPostContactInfoLoading = false
            state.OrganisationPostContactInfoError = null
        },
        handlePostOrganisationContactInfoDataFailure(state, action: PayloadAction<any>) {
            state.OrganisationPostContactInfoLoading = false
            state.OrganisationPostContactInfoError = action.payload
        },

        handlePostOrganisationAddressData(state, action: PayloadAction<PutOrganisationAddressParam>) {
            state.OrganisationPostAddressLoading = true
        },
        handlePostOrganisationAddressDataSucess(state) {
            state.OrganisationPostAddressLoading = false
            state.OrganisationPostAddressError = null
        },
        handlePostOrganisationAddressDataFailure(state, action: PayloadAction<any>) {
            state.OrganisationPostAddressLoading = false
            state.OrganisationPostAddressError = action.payload
        },

        handleOrganisationTimeline(state, action: PayloadAction<OrganisationTimelineRequestParam>) {
            state.organisationTimelineLoading = true
            state.organisationTimelineError = null
        },
        handleOrganisationTimelineSucess(
            state,
            //  action: PayloadAction<OrganisationTimelineApiResp[]>
            action: PayloadAction<{
                response: OrganisationTimelineApiResp[]
                payload: OrganisationTimelineRequestParam
            }>
        ) {
            const { response, payload } = action.payload

            localStorage.setItem('OrganisationID', payload.organizationid.toString())
            state.organisationTimelineData = response
            // state.organisationTimelineData = action.payload
            state.organisationTimelineLoading = false
            state.organisationTimelineError = null
        },
        handleOrganisationTimelineFailure(state, action: PayloadAction<any>) {
            state.organisationTimelineError = action.payload
            state.organisationTimelineLoading = false
        },

        handlePostOrganisationTimeline(state, action: PayloadAction<PostOrganisationTimelineBodyParam>) {
            state.PostOrganisationTimelineLoading = true
        },
        handlePostOrganisationTimelineSucess(state) {
            state.PostOrganisationTimelineLoading = false
        },
        handlePostOrganisationTimelineFailure(state, action: PayloadAction<any>) {
            state.PostOrganisationTimelineLoading = false
            state.PostOrganisationTimelineError = action.payload
        },

        handleOrganisationAddCommentTimeline(state, action: PayloadAction<AddCommentOrganisationTimelineBodyParam>) {
            state.addCommentOrganisationTimelineLoading = true
        },
        handleOrganisationAddCommentTimelineSucess(state) {
            // localStorage.setItem('OrganisationID', action.payload.toString())
            state.addCommentOrganisationTimelineLoading = false
        },
        handleOrganisationAddCommentTimelineFailure(state, action: PayloadAction<any>) {
            state.addCommentOrganisationTimelineLoading = false
            state.addCommentOrganisationTimelineError = action.payload
        },
    },
})

export const {
    handleOrganisation,
    handleOrganisationSucess,
    handleOrganisationFailure,
    handleCountry,
    handleCountrySucess,
    handleCountryFailure,
    handleZipCode,
    handleZipCodeSucess,
    handleZipCodeFailure,
    handlePostOrganization,
    handlePostOrganizationSucess,
    handlePostOrganizationError,
    handleOrganisationMobileData,
    handleStakeholder,
    handleStakeholderSucess,
    handleStakeholderError,
    handleOrganisationOverview,
    handleOrganisationOverviewSuccess,
    handleOrganisationOverviewFailure,
    handleOrganisationContactInfoData,
    handleOrganisationContactInfoDataSucess,
    handleOrganisationContactInfoDataFailure,
    handlePostOrganisationContactInfoData,
    handlePostOrganisationContactInfoDataSucess,
    handlePostOrganisationContactInfoDataFailure,
    handlePostOrganisationAddressData,
    handlePostOrganisationAddressDataSucess,
    handlePostOrganisationAddressDataFailure,
    handleOrganisationTimeline,
    handleOrganisationTimelineSucess,
    handleOrganisationTimelineFailure,
    handlePostOrganisationTimeline,
    handlePostOrganisationTimelineSucess,
    handlePostOrganisationTimelineFailure,
    handleOrganisationAddCommentTimeline,
    handleOrganisationAddCommentTimelineSucess,
    handleOrganisationAddCommentTimelineFailure,
} = organisationSlice.actions

export default organisationSlice.reducer
