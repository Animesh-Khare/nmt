interface ContactDetailRequestParam {
    idContactPerson: number
}

interface ContactDetailApiResp {
    functionName: string
    functionLevel: string
    secretary: string
    email: string
    mobile: string
    phonenumber: string
    organization: number
    activeContact: boolean
    clipper: boolean
    events: boolean
    magazine: boolean
    contactId: number
    secretaryid: number
    person: string
}

interface OrganisationDetailRequestParam {
    idOrganisationPerson: number
}

interface addressObj {
    idAddress: number
    country: string
    zipcode: string
    city: string
    streetName: string
    number: number
    addition: string
}

interface OrganisationDetailApiResp {
    orgname: string
    address: addressObj
}

interface ContactTimelineRequestParam {
    idcontact: number
}

interface PostContactTimelineBodyParam {
    ActionId: number
    description: string
    username: string
}

interface AddCommentTimelineBodyParam {
    description: string
    username: string
    contactid: number
}

interface ContactTimelineApiResp {
    action: string
    description: string
    date: string
    time: string
    username: string
    contactid: number
    idtimeline: number
}

interface ContactInfoRequestParams {
    contactId: number
}

interface ContactInfoApiResp {
    name: string
    firstname: string
    middlename: string
    lastname: string
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
    mainfunction: true
    secretary: number
    currentfunction: string
    startdate: string
    functioncount: number
    enddate: number
}

interface PostPersonalInfoData {
    idPersons: number
    name: string
    idGender: number
}

interface PostContactDetailData {
    idPersons: number
    mobile: string
    phoneNumber: string
    email: string
}

interface PostFunctionalDetailBodyParam {
    idfunction: number
    functionName: string
    isPrimary: number
    organization: number
    spotterId: string
    idFunctionClassification: number
    idFunctionLevel: number
    currentFunction: boolean
    mainFunction: boolean
    idPerson: number
    events: boolean
    clipper: boolean
    magazine: boolean
    secretary: number
    startdate: string
    enddate: string
    username: string
}

interface FunctionOverviewObj {
    idfunction: number
    functionName: string
    organization: string
    startdate: string
    enddate: string
    currentFunction: boolean
    functionlevel: string
    mainFunction: boolean
    idorgnization: number
    idfunctionlevel: number
    classification: number
    countfunction: number
}

interface FunctionOverviewApiResp {
    functions: FunctionOverviewObj[]
    totalPages: number
    count: number
}

interface GetFunctionQueryParams {
    idContact: number
    keyproperty: string
    searchkey: string
    pagenumber: number
}

interface AddFunctionBodyParams {
    idfunction: number
    functionName: string
    isPrimary: number
    organization: number
    spotterId: string
    idFunctionClassification: number
    idFunctionLevel: number
    currentFunction: boolean
    mainFunction: boolean
    idPerson: number
    events: boolean
    clipper: boolean
    magazine: boolean
    secretary: number
    startdate: string
    enddate: string
    username: string
}

interface EditFunctionBodyParams {
    idfunction: number
    functionName: string
    isPrimary: number
    organization: number
    spotterId: string
    idFunctionClassification: number
    idFunctionLevel: number
    currentFunction: boolean
    mainFunction: boolean
    idPerson: number
    events: boolean
    clipper: boolean
    magazine: boolean
    secretary: number
    startdate: string
    enddate: string
    username: string
}

interface SecretaryDropdownObj {
    name: string
    phoneNumber: string
    email: string
    organizationname: string
    fuctionname: string
    organizationid: number
    contactperson: number
    idGender: number
    active: boolean
}

interface SecretaryDropdownApiResp {
    contact: SecretaryDropdownObj[]
    totalPages: number
    count: number
}

interface PostContactPersonInactiveParam {
    clientid: number
    Inactive: boolean
}
export type {
    ContactDetailRequestParam,
    ContactDetailApiResp,
    OrganisationDetailRequestParam,
    OrganisationDetailApiResp,
    ContactTimelineRequestParam,
    ContactTimelineApiResp,
    PostContactTimelineBodyParam,
    AddCommentTimelineBodyParam,
    ContactInfoRequestParams,
    ContactInfoApiResp,
    PostPersonalInfoData,
    PostContactDetailData,
    PostFunctionalDetailBodyParam,
    FunctionOverviewObj,
    FunctionOverviewApiResp,
    AddFunctionBodyParams,
    EditFunctionBodyParams,
    GetFunctionQueryParams,
    SecretaryDropdownApiResp,
    SecretaryDropdownObj,
    PostContactPersonInactiveParam,
}
