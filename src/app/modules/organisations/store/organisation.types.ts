import {
    OrganisationApiResponse,
    OrganisationDisplay,
    countryType,
    StakeholderResponse,
    OrganisationOverviewCompanyDetails,
    OrganisationContactInfoDetails,
    OrganisationTimelineApiResp,
    CountryResponse,
    zipDataResponse,
} from '@app-types/OrganisationResponse.types'

interface OrganisationState {
    organisationLoading: boolean
    organisationData: OrganisationApiResponse | null
    organisationError: any

    countryLoading: boolean
    countryData: CountryResponse[] | null
    countryError: any

    zipDataLoading: boolean
    zipData: zipDataResponse | null
    zipDataError: any

    postOrganizationLoading: boolean
    postOrganizationError: any
    organisationMobileData: OrganisationDisplay[]

    stakeholderData: StakeholderResponse[] | null
    stakeholderLoading: boolean
    stakeholderError: any

    organisationOverviewInfoLoading: boolean
    organisationOverviewInfoData: null | OrganisationOverviewCompanyDetails
    organisationOverviewInfoError: any

    OrganisationContactInfoLoading: boolean
    OrganisationContactInfoData: null | OrganisationContactInfoDetails
    OrganisationContactInfoError: any

    OrganisationPostContactInfoLoading: boolean
    OrganisationPostContactInfoError: any

    OrganisationPostAddressLoading: boolean
    OrganisationPostAddressError: any

    organisationTimelineLoading: boolean
    organisationTimelineData: OrganisationTimelineApiResp[] | null
    organisationTimelineError: any

    PostOrganisationTimelineLoading: boolean
    PostOrganisationTimelineError: any

    addCommentOrganisationTimelineLoading: boolean
    addCommentOrganisationTimelineError: any

    OrganisationOverviewHead:string

}

export type { OrganisationState }
