interface OrganizationRequestParams {
    isAscending: boolean
    Keyproperty: string
    Searchkey: string
    organizationnmae: string
    location: string
    pagenumber: number
}

interface OrganisationDisplay {
    name: string
    city: string
    statusmembership: string
    membership: string
}

interface OrganisationApiResponse {
    organization: OrganisationDisplay[]
    totalPages: number
    count: number
}

interface CountryResponse {
    id: number
    name: string
    code: string
}

interface countryType {
    label: string
    value: number
}

interface zipcodeRequestParam {
    zipcode: string
    houseNo: number
}

interface zipcodeDocsObj {
    bron: string
    woonplaatscode: string
    type: string
    woonplaatsnaam: string
    nwb_id: string
    openbareruimtetype: string
    gemeentecode: string
    rdf_seealso: string
    weergavenaam: string
    straatnaam_verkort: string
    id: string
    gemeentenaam: string
    identificatie: string
    openbareruimte_id: string
    provinciecode: string
    provincienaam: string
    centroide_ll: string
    provincieafkorting: string
    centroide_rd: string
    straatnaam: string
    score: number
}

interface zipcodeResponseObj {
    numFound: number
    start: number
    maxScore: number
    numFoundExact: boolean
    docs: zipcodeDocsObj[]
}

interface zipDataResponse {
    response: zipcodeResponseObj
}

interface StakeholderResponse {
    idStakeHolder: number
    stakeHolderType: string
}

interface PostOrganizationBodyParam {
    name: string
    phoneNumber: string
    organizationEmail: string
    invoiceEmail: string
    idStakeHolder: number
    holding: number
    oOfund: string
    issameaddress: boolean
    postalAddress: {
        idAddress: number
        country: string
        zipcode: string
        city: string
        streetName: string
        number: number
        addition: string
    } | null
    visitorAddress: {
        idAddress: number
        country: string
        zipcode: string
        city: string
        streetName: string
        number: number
        addition: string
    }
}

// interface CountryResponse{

// }
interface OrganisationOverviewCompanyDetailsRequestParams {
    id: number
}
interface OrganisationOverviewCompanyDetails {
    email: string
    invoiceEmail: string
    phoneNumber: string
    visitorAddress: {
        idAddress: number
        country: string
        zipcode: string
        city: string
        streetName: string
        number: number
        addition: string
    }
    postalAddress: {
        idAddress: number
        country: string
        zipcode: string
        city: string
        streetName: string
        number: number
        addition: string
    }
    id: string
    type: string
    membertype: string
    advisor: string
    sameaddress: boolean
}

interface OrganisationContactRequestParams {
    isAscending: boolean
    Keyproperty: string
    Searchkey: string
    pagenumber: number
    organization: string
    function: string
    email: string
    phonenumber: string
    Name: string
}

interface OrganisationContactInfoDetails {
    idOrganization: number
    name: string
    addedby: number
    email: string
    invoiceMail: string
    phoneNumber: string
    companyName: string
    idHolding: number
    oOfund: string
    idStakeHolder: number
    idContact: number
    postalAddress: {
        idAddress: number
        country: string
        zipcode: string
        city: string
        streetName: string
        number: number
        addition: string
    }
    visitorAddress: {
        idAddress: number
        country: string
        zipcode: string
        city: string
        streetName: string
        number: number
        addition: string
    }
    sameAddress: boolean
}

interface PutOrganisationalDataParam {
    id: number
    name: string
    phoneNumber: string
    organizationEmail: string
    invoiceEmail: string
    holding: number
    oOfund: string
}

interface PutOrganisationAddressParam {
    organization: number
    postalAddress: {
        idAddress: number
        country: string
        zipcode: string
        city: string
        streetName: string
        number: number
        addition: string
    }
    visitorAddress: {
        idAddress: number
        country: string
        zipcode: string
        city: string
        streetName: string
        number: number
        addition: string
    }
    sameAddress: boolean
}
interface OrganisationTimelineRequestParam {
    organizationid: number
}
interface OrganisationTimelineApiResp {
    action: string
    description: string
    date: string
    time: string
    username: string
    contactid: number
    idtimeline: number
    organization: number
}
interface PostOrganisationTimelineBodyParam {
    actionId: number
    description: string
    username: string
}
interface AddCommentOrganisationTimelineBodyParam {
    description: string
    username: string
    organization: number
}

export type {
    OrganizationRequestParams,
    OrganisationApiResponse,
    CountryResponse,
    countryType,
    PostOrganizationBodyParam,
    OrganisationDisplay,
    StakeholderResponse,
    OrganisationOverviewCompanyDetails,
    OrganisationOverviewCompanyDetailsRequestParams,
    OrganisationContactRequestParams,
    OrganisationContactInfoDetails,
    PutOrganisationalDataParam,
    PutOrganisationAddressParam,
    OrganisationTimelineRequestParam,
    OrganisationTimelineApiResp,
    PostOrganisationTimelineBodyParam,
    AddCommentOrganisationTimelineBodyParam,
    zipcodeRequestParam,
    zipDataResponse,
}
