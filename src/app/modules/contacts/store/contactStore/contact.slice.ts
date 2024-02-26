import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ContactState } from '@contacts/store/contactStore/contact.types'
import {
    ContactApiResponse,
    ContactDisplay,
    ContactRequestParams,
    FunctionClassificationApiResp,
    FunctionLevelApiResp,
    GenderApiResp,
    HoldingsApiResp,
    PostContactBodyParamsOrganisation,
    PostContactPersonReactivateParam
} from '@app-types/ContactResponse.types'

const initialContact: ContactState = {
    contactLoading: false,
    contactData: null,
    contactError: null,

    contactMobileData: [],

    functionClassificationLoading: false,
    functionClassificationData: null,
    functionClassificationError: null,

    functionLevelLoading: false,
    functionLevelData: null,
    functionLevelError: null,

    HoldingsLoading: false,
    HoldingsData: null,
    HoldingsError: null,

    GenderLoading: false,
    GenderData: null,
    GenderError: null,

    PostContactLoading: false,
    PostContactError: null,

    ReactivateContactPersonLoading:false,
    ReactivateContactPersonError:null,
}


const contactSlice = createSlice({
    name: 'contact',
    initialState: initialContact,
    reducers: {
        handleContact(state, action: PayloadAction<ContactRequestParams>) {
            state.contactLoading = true
            state.contactError = null
        },
        handleContactSucess(state, action: PayloadAction<ContactApiResponse>) {
            state.contactData = action.payload
            state.contactLoading = false
            state.contactError = null
        },
        handleContactFailure(state, action: PayloadAction<any>) {
            state.contactError = action.payload
            state.contactLoading = false
        },

        // function classification api
        handlefunctionClassification(state) {
            state.functionClassificationLoading = true
            state.functionClassificationData = null
        },
        handlefunctionClassificationSucess(state, action: PayloadAction<FunctionClassificationApiResp[]>) {
            state.functionClassificationData = action.payload
            state.functionClassificationLoading = false
            state.functionClassificationError = null
        },
        handlefunctionClassificationFailure(state, action: PayloadAction<any>) {
            state.functionClassificationError = action.payload
            state.functionClassificationLoading = false
        },

        // function level api
        handlefunctionLevel(state) {
            state.functionLevelLoading = true
            state.functionLevelData = null
        },
        handlefunctionLevelSucess(state, action: PayloadAction<FunctionLevelApiResp[]>) {
            state.functionLevelData = action.payload
            state.functionLevelLoading = false
            state.functionLevelError = null
        },
        handlefunctionLevelFailure(state, action: PayloadAction<any>) {
            state.functionLevelError = action.payload
            state.functionLevelLoading = false
        },

        // Holdings api
        handleHoldings(state) {
            state.HoldingsLoading = true
            state.HoldingsData = null
        },
        handleHoldingsSucess(state, action: PayloadAction<HoldingsApiResp[]>) {
            state.HoldingsData = action.payload
            state.HoldingsLoading = false
            state.HoldingsError = null
        },
        handleHoldingsFailure(state, action: PayloadAction<any>) {
            state.HoldingsError = action.payload
            state.HoldingsLoading = false
        },

        // Gender api
        handleGender(state) {
            state.GenderLoading = true
            state.GenderData = null
        },
        handleGenderSucess(state, action: PayloadAction<GenderApiResp[]>) {
            state.GenderData = action.payload
            state.GenderLoading = false
            state.GenderError = null
        },
        handleGenderFailure(state, action: PayloadAction<any>) {
            state.GenderError = action.payload
            state.GenderLoading = false
        },

        // add contact
        handlePostContact(state, action: PayloadAction<PostContactBodyParamsOrganisation>) {
            state.PostContactLoading = true
        },
        handlePostContactSucess(state) {
            state.PostContactLoading = false
        },
        handlePostContactError(state, action: PayloadAction<any>) {
            state.PostContactLoading = false
            state.PostContactError = action.payload
        },

        handleContactMobileData(state, action: PayloadAction<ContactDisplay[]>) {
            if (action.payload.length === 0) {
                state.contactMobileData = []
            } else {
                state.contactMobileData = [...state.contactMobileData, ...action.payload]
            }
        },

        handleReactivateContactPerson(state, action: PayloadAction<PostContactPersonReactivateParam>) {
            state.ReactivateContactPersonLoading = true
        },
        handleReactivateContactPersonSucess(state) {
            state.ReactivateContactPersonLoading = false
        },
        handleReactivateContactPersonFailure(state, action: PayloadAction<any>) {
            state.ReactivateContactPersonError = action.payload
            state.ReactivateContactPersonLoading = false
        },
    },
})

export const {
    handleContact,
    handleContactSucess,
    handleContactFailure,
    handleContactMobileData,
    handlefunctionClassification,
    handlefunctionClassificationSucess,
    handlefunctionClassificationFailure,
    handlefunctionLevel,
    handlefunctionLevelSucess,
    handlefunctionLevelFailure,
    handleHoldings,
    handleHoldingsSucess,
    handleHoldingsFailure,
    handleGender,
    handleGenderSucess,
    handleGenderFailure,
    handlePostContact,
    handlePostContactSucess,
    handlePostContactError,
    handleReactivateContactPerson,
    handleReactivateContactPersonFailure,
    handleReactivateContactPersonSucess,
} = contactSlice.actions

export default contactSlice.reducer
