import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects'
import { AnyAction } from 'redux'

import OrganisationService from '@api/OrganisationService'
import {
    handleOrganisation,
    handleOrganisationSucess,
    handleOrganisationFailure,
    handleCountry,
    handleCountrySucess,
    handleCountryFailure,
    handlePostOrganization,
    handlePostOrganizationSucess,
    handlePostOrganizationError,
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
    handlePostOrganisationContactInfoDataFailure,
    handlePostOrganisationContactInfoDataSucess,
    handlePostOrganisationAddressData,
    handlePostOrganisationAddressDataFailure,
    handlePostOrganisationAddressDataSucess,
    handleOrganisationTimeline,
    handleOrganisationTimelineFailure,
    handleOrganisationTimelineSucess,
    handlePostOrganisationTimeline,
    handlePostOrganisationTimelineFailure,
    handlePostOrganisationTimelineSucess,
    handleOrganisationAddCommentTimeline,
    handleOrganisationAddCommentTimelineFailure,
    handleOrganisationAddCommentTimelineSucess,
    handleZipCode,
    handleZipCodeSucess,
    handleZipCodeFailure,
} from '@organisations/store/organisation.slice'

import {
    OrganisationApiResponse,
    CountryResponse,
    PostOrganizationBodyParam,
    OrganizationRequestParams,
    StakeholderResponse,
    OrganisationOverviewCompanyDetails,
    OrganisationContactInfoDetails,
    PutOrganisationalDataParam,
    PutOrganisationAddressParam,
    OrganisationTimelineRequestParam,
    OrganisationTimelineApiResp,
    PostOrganisationTimelineBodyParam,
    AddCommentOrganisationTimelineBodyParam,
    zipcodeRequestParam,
    zipDataResponse,
} from '@app-types/OrganisationResponse.types'
import { handleNotification } from '@store/generalStore/general.slice'

function* watchHandleOrganisationData(
    action: ReturnType<typeof handleOrganisation>
): Generator<CallEffect<OrganisationApiResponse> | PutEffect<AnyAction>, void, OrganisationApiResponse> {
    try {
        const response = yield call(OrganisationService.getOrganisationData, action.payload)

        yield put(handleOrganisationSucess(response))
    } catch (error: any) {
        yield put(handleOrganisationFailure(error))
    }
}

function* watchHandleCountry(
    action: ReturnType<typeof handleCountry>
): Generator<CallEffect<null> | PutEffect<AnyAction>, void, CountryResponse[]> {
    try {
        const response = yield call(OrganisationService.getCountryApi)

        // const res = response.map((item, index) => ({ label: item.name.common, value: index }

        // const res = response.map((item, index) => ({ label: item.name, value: item.id }))

        // res.sort((a, b) => {
        //     if (
        //         a.label === 'Netherlands' ||
        //         a.label === 'Germany' ||
        //         a.label === 'France' ||
        //         a.label === 'United Kingdom' ||
        //         a.label === 'Norway'
        //     ) {
        //         return -1 // a should come before b
        //     }
        //     if (
        //         a.label === 'Netherlands' ||
        //         a.label === 'Germany' ||
        //         a.label === 'France' ||
        //         a.label === 'United Kingdom' ||
        //         a.label === 'Norway'
        //     ) {
        //         return 1 // a should come after b
        //     }
        //     return 0 // a and b are equal in terms of sorting
        // })

        yield put(handleCountrySucess(response))
    } catch (error: any) {
        yield put(handleCountryFailure(error))
    }
}

function* watchHandleZipCodeData(
    action: ReturnType<typeof handleZipCode>
): Generator<CallEffect<zipcodeRequestParam> | PutEffect<AnyAction>, void, zipDataResponse> {
    try {
        const response = yield call(OrganisationService.getZipData, action.payload)
        yield put(handleZipCodeSucess(response))
    } catch (error: any) {
        yield put(handleZipCodeFailure(error))
    }
}

function* watchHandlePostOrganization(
    action: ReturnType<typeof handlePostOrganization>
): Generator<CallEffect<PostOrganizationBodyParam> | PutEffect<AnyAction>, void, void> {
    try {
        yield call(OrganisationService.postOrganiization, action.payload)

        yield put(handlePostOrganizationSucess())

        const organizationRequestParams: OrganizationRequestParams = {
            isAscending: true,
            Keyproperty: 'Name',
            Searchkey: '',
            organizationnmae: '',
            location: '',
            pagenumber: 1,
        }

        yield put(handleOrganisation(organizationRequestParams))
        yield put(
            handleNotification({
                variant: 'success',
                message: 'Well done!',
                info: 'Organization has been added sucessfully',
            })
        )
    } catch (error: any) {
        yield put(handlePostOrganizationError(error))
        yield put(
            handleNotification({
                variant: 'error',
                message: 'Oh snap!',
                info: error.response.data.errorMessage,
            })
        )
    }
}

function* watchHandleStakeholder(
    action: ReturnType<typeof handleStakeholder>
): Generator<CallEffect<null> | PutEffect<AnyAction>, void, StakeholderResponse[]> {
    try {
        const response = yield call(OrganisationService.getStakeholder)

        yield put(handleStakeholderSucess(response))
    } catch (error: any) {
        yield put(handleStakeholderError(error))
    }
}
function* watchHandleOrganisationOverview(
    action: ReturnType<typeof handleOrganisationOverview>
): Generator<
    CallEffect<OrganisationOverviewCompanyDetails> | PutEffect<AnyAction>,
    void,
    OrganisationOverviewCompanyDetails
> {
    try {
        const SendParams = action.payload
        const response = yield call(OrganisationService.getOrganisationOverviewData, SendParams)
        yield put(handleOrganisationOverviewSuccess(response))
    } catch (error: any) {
        yield put(handleOrganisationOverviewFailure(error))
    }
}

function* watchHandleOrganisationContactInfoData(
    action: ReturnType<typeof handleOrganisationContactInfoData>
): Generator<CallEffect<OrganisationContactInfoDetails> | PutEffect<AnyAction>, void, OrganisationContactInfoDetails> {
    try {
        const SendParams = action.payload
        const response = yield call(OrganisationService.getOrganisationContactInfoDetails, SendParams)
        yield put(handleOrganisationContactInfoDataSucess(response))
    } catch (error: any) {
        yield put(handleOrganisationContactInfoDataFailure(error))
    }
}
function* watchHandlePostOrganisationContactInfoData(
    action: ReturnType<typeof handlePostOrganisationContactInfoData>
): Generator<CallEffect<PutOrganisationalDataParam> | PutEffect<AnyAction>, void, never> {
    try {
        // const parmType:PutOrganisationalDataParam=requestBody;
        const { id,name } = action.payload
        yield call(OrganisationService.editOrganisationalModalData, action.payload)

        yield put(handleOrganisationOverview({ id: id }))
        //   yield put(handleOrganisationContactInfoData({id:id}))
        yield put(handlePostOrganisationContactInfoDataSucess(name))

        yield put(
            handleNotification({
                variant: 'success',
                message: 'Well done!',
                info: 'Organisation data has been updated',
            })
        )
    } catch (error: any) {
        yield put(handlePostOrganisationContactInfoDataFailure(error))

        yield put(
            handleNotification({
                variant: 'error',
                message: 'Oh snap!',
                info: 'Contact info updation failed',
            })
        )
    }
}

function* watchHandlePostOrganisationAddressData(
    action: ReturnType<typeof handlePostOrganisationAddressData>
): Generator<CallEffect<PutOrganisationAddressParam> | PutEffect<AnyAction>, void, never> {
    try {
        const { organization } = action.payload
        yield call(OrganisationService.editOrganisationalAddressModalData, action.payload)
        yield put(handleOrganisationOverview({ id: organization }))
        yield put(handlePostOrganisationAddressDataSucess())

        yield put(
            handleNotification({
                variant: 'success',
                message: 'Well done!',
                info: 'Address data has been updated',
            })
        )
    } catch (error: any) {
        yield put(handlePostOrganisationAddressDataFailure(error))

        yield put(
            handleNotification({
                variant: 'error',
                message: 'Oh snap!',
                info: 'Address data updation failed',
            })
        )
    }
}
function* watchHandleOrganisationTimelineData(
    action: ReturnType<typeof handleOrganisationTimeline>
): Generator<CallEffect<OrganisationTimelineRequestParam> | PutEffect<AnyAction>, void, OrganisationTimelineApiResp[]> {
    try {
        const response = yield call(OrganisationService.getOrganisationTimeline, action.payload)
        yield put(handleOrganisationTimelineSucess({ response, payload: action.payload }));
    } catch (error: any) {
        yield put(handleOrganisationTimelineFailure(error))
    }
}

function* watchHandlePostOrganisationTimeline(
    action: ReturnType<typeof handlePostOrganisationTimeline>
): Generator<CallEffect<PostOrganisationTimelineBodyParam> | PutEffect<AnyAction>, void, any> {
    try {
        yield call(OrganisationService.postOrganisationTimeline, action.payload)
        yield put(handlePostOrganisationTimelineSucess())

        // yield put(
        //     handleOrganisationTimeline({
        //         organizationid: 2,
        //     })
        // )

        yield put(
            handleOrganisationTimeline({
                organizationid: Number(localStorage.getItem('OrganisationID'))
            })
        )
    } catch (error: any) {
        yield put(handlePostOrganisationTimelineFailure(error))
    }
}
function* watchHandleAddCommentOrganisationTimelineData(
    action: ReturnType<typeof handleOrganisationAddCommentTimeline>
): Generator<CallEffect<AddCommentOrganisationTimelineBodyParam> | PutEffect<AnyAction>, void, any> {
    try {
        yield call(OrganisationService.addCommentOrganisationTimeline, action.payload)
        yield put(handleOrganisationAddCommentTimelineSucess())

        yield put(
            handleOrganisationTimeline({
                organizationid: Number(localStorage.getItem('OrganisationID'))
            })
        )

        yield put(
            handleNotification({
                variant: 'success',
                message: 'well done!',
                info: 'New comment added',
            })
        )
    } catch (error: any) {
        yield put(handleOrganisationAddCommentTimelineFailure(error))
    }
}

const organisationSaga = [
    takeLatest(handleOrganisation, watchHandleOrganisationData),
    takeLatest(handleCountry, watchHandleCountry),
    takeLatest(handleZipCode, watchHandleZipCodeData),
    takeLatest(handlePostOrganization, watchHandlePostOrganization),
    takeLatest(handleStakeholder, watchHandleStakeholder),
    takeLatest(handleOrganisationOverview, watchHandleOrganisationOverview),
    takeLatest(handleOrganisationContactInfoData, watchHandleOrganisationContactInfoData),
    takeLatest(handlePostOrganisationContactInfoData, watchHandlePostOrganisationContactInfoData),
    takeLatest(handlePostOrganisationAddressData, watchHandlePostOrganisationAddressData),
    takeLatest(handleOrganisationTimeline, watchHandleOrganisationTimelineData),
    takeLatest(handlePostOrganisationTimeline, watchHandlePostOrganisationTimeline),
    takeLatest(handleOrganisationAddCommentTimeline, watchHandleAddCommentOrganisationTimelineData),
]

export default organisationSaga
