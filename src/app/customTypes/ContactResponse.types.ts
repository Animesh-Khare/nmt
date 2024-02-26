interface ContactRequestParams {
    isAscending: boolean
    Keyproperty: string
    Searchkey: string
    pagenumber: number
    organization: string
    function: string
    email: string
    phonenumber: string
    Name: string
    orgid: number
}

interface ContactDisplay {
    name: string
    phoneNumber: string
    email: string
    organizationname: string
    fuctionname: string
    organizationid: number
    contactperson: number
    idGender: number
    active: boolean
    currentfuncount: number
    functionlevel: string
}

interface ContactApiResponse {
    contact: ContactDisplay[]
    totalPages: number
    count: number
}

interface FunctionClassificationApiResp {
    idFunctionClassification: number
    name: string
}

interface FunctionLevelApiResp {
    idFunctionLevel: number
    name: string
}

interface HoldingsApiResp {
    idOrganization: number
    name: string
}

interface GenderApiResp {
    idGender: number
    name: string
}

interface PostContactBodyParams {
    name: string
    idGender: number
    mobile: string
    phoneNumber: string
    email: string
    events: boolean
    clipper: boolean
    magazine: boolean
    functionName: string
    idFunctionClassification: number
    organization: number
    idFunctionLevel: number
}

interface PostContactBodyParamsOrganisation {
    name: string
    idGender: number
    mobile: string
    phoneNumber: string
    email: string
    events: boolean
    clipper: boolean
    magazine: boolean
    functionName: string
    idFunctionClassification: number
    organization: number
    idFunctionLevel: number
    isOrganisationContact: boolean
}

interface PostContactPersonReactivateParam {
    clientid: number | null
    Inactive: boolean
}

export type {
    ContactRequestParams,
    ContactApiResponse,
    ContactDisplay,
    FunctionClassificationApiResp,
    FunctionLevelApiResp,
    HoldingsApiResp,
    GenderApiResp,
    PostContactBodyParams,
    PostContactBodyParamsOrganisation,
    PostContactPersonReactivateParam,
}
