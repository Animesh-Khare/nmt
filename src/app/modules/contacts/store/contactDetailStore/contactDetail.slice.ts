import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ContactDetailState } from '@contacts/store/contactDetailStore/contactDetail.types'
import {
    ContactDetailApiResp,
    ContactDetailRequestParam,
    ContactInfoApiResp,
    ContactInfoRequestParams,
    ContactTimelineApiResp,
    ContactTimelineRequestParam,
    OrganisationDetailApiResp,
    OrganisationDetailRequestParam,
    PostContactDetailData,
    PostContactTimelineBodyParam,
    PostFunctionalDetailBodyParam,
    PostPersonalInfoData,
    FunctionOverviewApiResp,
    AddFunctionBodyParams,
    EditFunctionBodyParams,
    GetFunctionQueryParams,
    AddCommentTimelineBodyParam,
    SecretaryDropdownApiResp,
    PostContactPersonInactiveParam
} from '@app-types/ContactDetailResponse.types'
import { ContactRequestParams } from '@app-types/ContactResponse.types'

// import {
//     ContactApiResponse,
//     ContactDisplay,
//     ContactRequestParams,
//     FunctionClassificationApiResp,
//     FunctionLevelApiResp,
//     GenderApiResp,
//     HoldingsApiResp,
//     PostContactBodyParams,
// } from '@app-types/ContactResponse.types'

const initialContactDetail: ContactDetailState = {
    contactDetailLoading: false,
    contactDetailData: null,
    contactDetailError: null,

    organisationDetailLoading: false,
    organisationDetailData: null,
    organisationDetailError: null,

    contactTimelineLoading: false,
    contactTimelineData: null,
    contactTimelineError: null,

    PostContactTimelineLoading: false,
    PostContactTimelineError: null,

    inactiveContactLoading: false,
    inactiveContactError: null,

    deleteContactLoading: false,
    deleteContactError: null,
    deleteContactData: null,

    contactInfoDataLoading: false,
    contactInfoData: null,
    contactInfoDataError: null,

    postPersonalInfoLoading: false,
    postPersonalInfoError: null,

    postContactDetailLoading: false,
    postContactDetailError: null,

    postFunctionalDetailLoading: false,
    postFunctionalDetailError: null,

    functionOverviewLoading: false,
    functionOverviewData: null,
    functionOverviewError: null,

    addFunctionLoading: false,
    addFunctionError: null,

    editFunctionLoading: false,
    editFunctionError: null,

    deleteFunctionLoading: false,
    deleteFunctionError: null,

    addCommentTimelineLoading: false,
    addCommentTimelineError: null,

    secretaryDropdownLoading: false,
    secretaryDropdownData: null,
    secretaryDropdownError: null,

    ContactOverviewHead:" "
}

const contactDetailSlice = createSlice({
    name: 'contactDetail',
    initialState: initialContactDetail,
    reducers: {
        // contact detail
        handleContactDetail(state, action: PayloadAction<ContactDetailRequestParam>) {
            state.contactDetailLoading = true
            state.contactDetailError = null
        },
        handleContactDetailSucess(state, action: PayloadAction<ContactDetailApiResp>) {

            state.contactDetailData = action.payload
            state.contactDetailLoading = false
            state.contactDetailError = null
        },
        handleContactDetailFailure(state, action: PayloadAction<any>) {
            state.contactDetailError = action.payload
            state.contactDetailLoading = false
        },

        // organisation detail

        handleOrganisationDetail(state, action: PayloadAction<OrganisationDetailRequestParam>) {
            state.organisationDetailLoading = true
            state.organisationDetailError = null
        },
        handleOrganisationDetailSucess(state, action: PayloadAction<OrganisationDetailApiResp>) {
            state.organisationDetailData = action.payload
            state.organisationDetailLoading = false
            state.organisationDetailError = null
        },
        handleOrganisationDetailFailure(state, action: PayloadAction<any>) {
            state.organisationDetailError = action.payload
            state.organisationDetailLoading = false
        },

        // contact timeline
        handleContactTimeline(state, action: PayloadAction<ContactTimelineRequestParam>) {
            state.contactTimelineLoading = true
            state.contactTimelineError = null
        },
        handleContactTimelineSucess(state, action: PayloadAction<ContactTimelineApiResp[]>) {
            state.contactTimelineData = action.payload
            state.contactTimelineLoading = false
            state.contactTimelineError = null
        },
        handleContactTimelineFailure(state, action: PayloadAction<any>) {
            state.contactTimelineError = action.payload
            state.contactTimelineLoading = false
        },

        // post contact timeline
        handlePostContactTimeline(state, action: PayloadAction<PostContactTimelineBodyParam>) {
            state.PostContactTimelineLoading = true
        },
        handlePostContactTimelineSucess(state) {
            state.PostContactTimelineLoading = false
        },
        handlePostContactTimelineFailure(state, action: PayloadAction<any>) {
            state.PostContactTimelineLoading = false
            state.PostContactTimelineError = action.payload
        },

        // contact info api
        handleContactInfoData(state, action: PayloadAction<ContactInfoRequestParams>) {
            state.contactInfoDataLoading = true
        },
        handleContactInfoDataSucess(state, action: PayloadAction<ContactInfoApiResp>) {
            state.contactInfoDataLoading = false
            state.contactInfoData = action.payload
        },
        handleContactInfoDataFailure(state, action: PayloadAction<any>) {
            state.contactInfoDataLoading = false
            state.contactInfoDataError = action.payload
        },
        handleInactiveContact(state, action: PayloadAction<PostContactPersonInactiveParam>) {
            state.inactiveContactLoading = true
        },
        handleInactiveContactSucess(state) {
            state.inactiveContactLoading = false
        },
        handleInactiveContactFailure(state, action: PayloadAction<any>) {
            state.inactiveContactLoading = false
            state.inactiveContactError = action.payload
        },

        handleDeleteContact(state, action: PayloadAction<number>) {
            state.deleteContactLoading = true
        },
        handleDeleteContactSucess(state, action: PayloadAction<number>) {
            state.deleteContactLoading = false
            state.deleteContactData = action.payload
        },
        handleDeleteContactFailure(state, action: PayloadAction<any>) {
            state.deleteContactLoading = false
            state.deleteContactError = action.payload
        },

        // post personal info
        handlePostPersonalInfo(state, action: PayloadAction<PostPersonalInfoData>) {
            state.postPersonalInfoLoading = true
        },
        handlePostPersonalInfoSucess(state,action: PayloadAction<any>) {
state.ContactOverviewHead=action.payload
            state.postPersonalInfoLoading = false
        },
        handlePostPersonalInfoFailure(state, action: PayloadAction<any>) {
            state.postPersonalInfoLoading = false
            state.postPersonalInfoError = action.payload
        },

        // post contact detail data
        handlePostContactDetail(state, action: PayloadAction<PostContactDetailData>) {
            state.postContactDetailLoading = true
        },
        handlePostContactDetailSucess(state) {
            state.postContactDetailLoading = false
        },
        handlePostContactDetailFailure(state, action: PayloadAction<any>) {
            state.postContactDetailLoading = false
            state.postContactDetailError = action.payload
        },

        // post functional detail data
        handlePostFunctionalDetail(state, action: PayloadAction<PostFunctionalDetailBodyParam>) {
            state.postFunctionalDetailLoading = true
        },
        handlePostFunctionalDetailSucess(state) {
            state.postFunctionalDetailLoading = false
        },
        handlePostFunctionalDetailFailure(state, action: PayloadAction<any>) {
            state.postFunctionalDetailLoading = false
            state.postFunctionalDetailError = action.payload
        },

        // get function overview
        handleGetFunctionOverview(state, action: PayloadAction<GetFunctionQueryParams>) {
            state.functionOverviewLoading = true
        },
        handleGetFunctionOverviewSucess(state, action: PayloadAction<FunctionOverviewApiResp>) {
            state.functionOverviewLoading = false
            state.functionOverviewData = action.payload
        },
        handleGetFunctionOverviewFailure(state, action: PayloadAction<any>) {
            state.functionOverviewLoading = false
            state.functionOverviewError = action.payload
        },

        // add function post api
        handleAddFunction(state, action: PayloadAction<AddFunctionBodyParams>) {
            state.postFunctionalDetailLoading = true
        },
        handleAddFunctionSucess(state) {
            state.postFunctionalDetailLoading = false
        },
        handleAddFunctionFailure(state, action: PayloadAction<any>) {
            state.postFunctionalDetailLoading = false
            state.postFunctionalDetailError = action.payload
        },

        // edit function
        handleEditFunction(state, action: PayloadAction<EditFunctionBodyParams>) {
            state.editFunctionLoading = true
        },
        handleEditFunctionSucess(state) {
            state.editFunctionLoading = false
        },
        handleEditFunctionFailure(state, action: PayloadAction<any>) {
            state.editFunctionLoading = false
            state.editFunctionError = action.payload
        },

        // delete function
        handleDeleteFunction(state, action: PayloadAction<number>) {
            state.deleteFunctionLoading = true
        },
        handleDeleteFunctionSucess(state) {
            state.deleteFunctionLoading = false
        },
        handleDeleteFunctionFailure(state, action: PayloadAction<any>) {
            state.deleteFunctionLoading = false
            state.deleteFunctionError = action.payload
        },

        // add comment timeline api
        handleAddCommentTimeline(state, action: PayloadAction<AddCommentTimelineBodyParam>) {
            state.addCommentTimelineLoading = true
        },
        handleAddCommentTimelineSucess(state) {
            state.addCommentTimelineLoading = false
        },
        handleAddCommentTimelineFailure(state, action: PayloadAction<any>) {
            state.addCommentTimelineLoading = false
            state.addCommentTimelineError = action.payload
        },

        // secetary dropdown data
        handleSecretaryDropdown(state, action: PayloadAction<ContactRequestParams>) {
            state.secretaryDropdownLoading = true
            state.secretaryDropdownError = null
        },
        handleSecretaryDropdownSucess(state, action: PayloadAction<SecretaryDropdownApiResp>) {
            state.secretaryDropdownData = action.payload
            state.secretaryDropdownLoading = false
            state.secretaryDropdownError = null
        },
        handleSecretaryDropdownFailure(state, action: PayloadAction<any>) {
            state.secretaryDropdownError = action.payload
            state.secretaryDropdownLoading = false
        },
         handleDeleteContactOverviewHeading(state){
            state.ContactOverviewHead=""
         }
    },
})

export const {
    handleContactDetail,
    handleContactDetailSucess,
    handleContactDetailFailure,
    handleOrganisationDetail,
    handleOrganisationDetailSucess,
    handleOrganisationDetailFailure,
    handleContactTimeline,
    handleContactTimelineSucess,
    handleContactTimelineFailure,
    handlePostContactTimeline,
    handlePostContactTimelineSucess,
    handlePostContactTimelineFailure,
    handleInactiveContact,
    handleInactiveContactSucess,
    handleInactiveContactFailure,
    handleDeleteContact,
    handleDeleteContactSucess,
    handleDeleteContactFailure,

    handleContactInfoData,
    handleContactInfoDataSucess,
    handleContactInfoDataFailure,

    handlePostPersonalInfo,
    handlePostPersonalInfoSucess,
    handlePostPersonalInfoFailure,

    handlePostContactDetail,
    handlePostContactDetailSucess,
    handlePostContactDetailFailure,

    handlePostFunctionalDetail,
    handlePostFunctionalDetailSucess,
    handlePostFunctionalDetailFailure,

    handleGetFunctionOverview,
    handleGetFunctionOverviewSucess,
    handleGetFunctionOverviewFailure,

    handleAddFunction,
    handleAddFunctionSucess,
    handleAddFunctionFailure,

    handleEditFunction,
    handleEditFunctionSucess,
    handleEditFunctionFailure,

    handleDeleteFunction,
    handleDeleteFunctionSucess,
    handleDeleteFunctionFailure,

    handleAddCommentTimeline,
    handleAddCommentTimelineSucess,
    handleAddCommentTimelineFailure,

    handleSecretaryDropdown,
    handleSecretaryDropdownSucess,
    handleSecretaryDropdownFailure,

    handleDeleteContactOverviewHeading
} = contactDetailSlice.actions
export default contactDetailSlice.reducer
