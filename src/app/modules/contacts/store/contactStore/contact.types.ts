import { ContactApiResponse, ContactDisplay, FunctionClassificationApiResp, FunctionLevelApiResp , GenderApiResp, HoldingsApiResp} from "@app-types/ContactResponse.types"

interface ContactState {
    contactLoading: boolean
    contactData: ContactApiResponse | null
    contactError: any

    contactMobileData: ContactDisplay[]

    functionClassificationLoading: boolean,
    functionClassificationData: FunctionClassificationApiResp[] | null,
    functionClassificationError: any,

    functionLevelLoading: boolean,
    functionLevelData: FunctionLevelApiResp[] | null,
    functionLevelError: any,

    HoldingsLoading: boolean,
    HoldingsData:  HoldingsApiResp[] | null,
    HoldingsError: any,

    GenderLoading: boolean,
    GenderData:  GenderApiResp[] | null,
    GenderError: any

    PostContactLoading: boolean,
    PostContactError: any,

    ReactivateContactPersonLoading:boolean,
    ReactivateContactPersonError:any,

}

export type { ContactState }
