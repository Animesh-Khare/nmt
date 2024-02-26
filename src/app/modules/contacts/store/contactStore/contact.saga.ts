import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects'
import { AnyAction } from 'redux'

import {
    handleContact,
    handleContactSucess,
    handleContactFailure,
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
    handleReactivateContactPerson,
    handleReactivateContactPersonFailure,
    handleReactivateContactPersonSucess
} from '@contacts/store/contactStore/contact.slice'
import {handleDeleteContactOverviewHeading} from '@contacts/store/contactDetailStore/contactDetail.slice'
import ContactService from '@api/ContactService'

import {
    ContactRequestParams,
    ContactApiResponse,
    FunctionClassificationApiResp,
    FunctionLevelApiResp,
    GenderApiResp,
    HoldingsApiResp,
    PostContactBodyParams,
    PostContactBodyParamsOrganisation,
    PostContactPersonReactivateParam
} from '@app-types/ContactResponse.types'

import { handleNotification } from '@store/generalStore/general.slice'
import { handleOrganisationTimeline } from '../../../organisations/store/organisation.slice'


function* watchHandleContactData(
    action: ReturnType<typeof handleContact>
): Generator<CallEffect<ContactApiResponse> | PutEffect<AnyAction>, void, ContactApiResponse> {
    try {
        const response = yield call(ContactService.getContactData, action.payload)

        yield put(handleContactSucess(response))
        yield put (handleDeleteContactOverviewHeading())
    } catch (error: any) {
        yield put(handleContactFailure(error))
    }
}

function* watchHandleFunctionClassification(
    action: ReturnType<typeof handlefunctionClassification>
): Generator<CallEffect<null> | PutEffect<AnyAction>, void, FunctionClassificationApiResp[]> {
    try {
        const response = yield call(ContactService.getFunctionClassification)

        yield put(handlefunctionClassificationSucess(response))
    } catch (error: any) {
        yield put(handlefunctionClassificationFailure(error))
    }
}

function* watchHandleFunctionLevel(
    action: ReturnType<typeof handlefunctionLevel>
): Generator<CallEffect<null> | PutEffect<AnyAction>, void, FunctionLevelApiResp[]> {
    try {
        const response = yield call(ContactService.getFunctionLevel)

        yield put(handlefunctionLevelSucess(response))
    } catch (error: any) {
        yield put(handlefunctionLevelFailure(error))
    }
}


function* watchHandleHoldings(
    action: ReturnType<typeof handleHoldings>
): Generator<CallEffect<null> | PutEffect<AnyAction>, void, HoldingsApiResp[]> {
    try {
        const response = yield call(ContactService.getHoldings)

        yield put(handleHoldingsSucess(response))
    } catch (error: any) {
        yield put(handleHoldingsFailure(error))
    }
}


function* watchHandleGender(
    action: ReturnType<typeof handleGender>
): Generator<CallEffect<null> | PutEffect<AnyAction>, void, GenderApiResp[]> {
    try {
        const response = yield call(ContactService.getGender)

        yield put(handleGenderSucess(response))
      
    } catch (error: any) {
        yield put(handleGenderFailure(error))
    }
}


function* watchHandlePostContact(
    action: ReturnType<typeof handlePostContact>
): Generator<CallEffect<PostContactBodyParamsOrganisation> | PutEffect<AnyAction>, void, void> {
    try {

        const {isOrganisationContact, ...callbackData}= action.payload
        const dataa: PostContactBodyParams= callbackData

        yield call(ContactService.postContactData, dataa)

        yield put(handlePostContactSucess())
  
        const contactRequestParams: ContactRequestParams = {
            isAscending: true,
            Keyproperty: '',
            Searchkey: '',
            pagenumber: 1,
            organization: '',
            function: '',
            email: '',
            phonenumber: '',
            Name: '',
            orgid: isOrganisationContact ? action.payload.organization : 0
        }

        yield put(handleContact(contactRequestParams))
        yield put (handleOrganisationTimeline({
            organizationid: Number(localStorage.getItem('OrganisationID'))
        }))
        yield put(
            handleNotification({
                variant: 'success',
                message: 'Well done!',
                info: 'Contact has been added sucessfully',
            })
        )

    } catch (error: any) {
        yield put(handleGenderFailure(error))

     
        yield put(
            handleNotification({
                variant: 'error',
                message: 'Oh snap!',
                info: error.response.data.errorMessage,
            })
        )
    }
}
function* watchHandleReactivateContactPerson(
    action: ReturnType<typeof handleReactivateContactPerson>
): Generator<CallEffect<PostContactPersonReactivateParam> | PutEffect<AnyAction>, void, void> {
    try {
        yield call(ContactService.postReactivateContactPerson, action.payload)
        const contactRequestParams: ContactRequestParams = {
            isAscending: true,
            Keyproperty: 'Name',
            Searchkey: '',
            pagenumber: 1,
            organization: '',
            function: '',
            email: '',
            phonenumber: '',
            Name: '',
            orgid: 0
        }

        yield put(handleContact(contactRequestParams))
        yield put (handleReactivateContactPersonSucess())
        yield put(
            handleNotification({
                variant: 'success',
                message: 'Contact person activated',
                info: 'sucessfully updated',
            })
        )

    } 
    catch(error:any){
        yield put (handleReactivateContactPersonFailure(error))
        yield put(
            handleNotification({
                variant: 'error',
                message: 'Oh snap!',
                info: error.response.data.errorMessage,
            })
        )

    }
}


const contactSaga = [
    takeLatest(handleContact, watchHandleContactData),
    takeLatest(handlefunctionClassification, watchHandleFunctionClassification),
    takeLatest(handlefunctionLevel, watchHandleFunctionLevel),
    takeLatest(handleHoldings, watchHandleHoldings),
    takeLatest(handleGender, watchHandleGender),
    takeLatest(handlePostContact, watchHandlePostContact),
    takeLatest(handleReactivateContactPerson, watchHandleReactivateContactPerson),
    
]

export default contactSaga
