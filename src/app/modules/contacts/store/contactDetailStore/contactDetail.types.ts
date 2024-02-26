import {
    ContactDetailApiResp,
    OrganisationDetailApiResp,
    ContactTimelineApiResp,
    ContactInfoApiResp,
    FunctionOverviewApiResp,
    SecretaryDropdownApiResp,
} from '@app-types/ContactDetailResponse.types'

interface ContactDetailState {
    contactDetailLoading: boolean
    contactDetailData: ContactDetailApiResp | null
    contactDetailError: any

    organisationDetailLoading: boolean
    organisationDetailData: OrganisationDetailApiResp | null
    organisationDetailError: any

    contactTimelineLoading: boolean
    contactTimelineData: ContactTimelineApiResp[] | null
    contactTimelineError: any

    PostContactTimelineLoading: boolean
    PostContactTimelineError: any

    inactiveContactLoading: boolean
    inactiveContactError: any

    deleteContactLoading: boolean
    deleteContactError: any
    deleteContactData: number | null

    contactInfoDataLoading: boolean
    contactInfoData: ContactInfoApiResp | null
    contactInfoDataError: any

    postPersonalInfoLoading: boolean
    postPersonalInfoError: any

    postContactDetailLoading: boolean
    postContactDetailError: any

    postFunctionalDetailLoading: boolean
    postFunctionalDetailError: any

    functionOverviewLoading: boolean
    functionOverviewData: FunctionOverviewApiResp | null
    functionOverviewError: any

    addFunctionLoading: boolean
    addFunctionError: any

    editFunctionLoading: boolean
    editFunctionError: any

    deleteFunctionLoading: boolean,
    deleteFunctionError: any,

    addCommentTimelineLoading: boolean
    addCommentTimelineError: any

    secretaryDropdownLoading: boolean
    secretaryDropdownData: SecretaryDropdownApiResp | null
    secretaryDropdownError: any

    ContactOverviewHead:string
}

export type { ContactDetailState }
