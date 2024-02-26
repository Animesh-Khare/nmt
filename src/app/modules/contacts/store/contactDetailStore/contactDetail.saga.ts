import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects'
// import { useNavigate } from 'react-router-dom'
import { AnyAction } from 'redux'

import {
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
    handleContactInfoData,
    handleContactInfoDataSucess,
    handleContactInfoDataFailure,
    handleInactiveContact,
    handleInactiveContactSucess,
    handleInactiveContactFailure,
    handleDeleteContact,
    handleDeleteContactSucess,
    handleDeleteContactFailure,
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
    handleAddCommentTimeline,
    handleAddCommentTimelineSucess,
    handleAddCommentTimelineFailure,
    handleSecretaryDropdown,
    handleSecretaryDropdownSucess,
    handleSecretaryDropdownFailure,
    handleDeleteFunction,
    handleDeleteFunctionSucess,
    handleDeleteFunctionFailure,
} from '@contacts/store/contactDetailStore/contactDetail.slice'

import { handleNotification } from '@store/generalStore/general.slice'

import ContactDetailService from '@api/ContactDetailService'

// import { handleNotification } from '@store/generalStore/general.slice'
import {
    ContactDetailRequestParam,
    ContactDetailApiResp,
    OrganisationDetailRequestParam,
    OrganisationDetailApiResp,
    ContactTimelineApiResp,
    ContactTimelineRequestParam,
    PostContactTimelineBodyParam,
    ContactInfoRequestParams,
    ContactInfoApiResp,
    PostPersonalInfoData,
    PostContactDetailData,
    PostFunctionalDetailBodyParam,
    FunctionOverviewApiResp,
    AddFunctionBodyParams,
    EditFunctionBodyParams,
    GetFunctionQueryParams,
    AddCommentTimelineBodyParam,
    SecretaryDropdownApiResp,
    PostContactPersonInactiveParam
} from '@app-types/ContactDetailResponse.types'
import { ContactRequestParams } from '@app-types/ContactResponse.types'

function* watchHandleContactDetailData(
    action: ReturnType<typeof handleContactDetail>
): Generator<CallEffect<ContactDetailRequestParam> | PutEffect<AnyAction>, void, ContactDetailApiResp> {
    try {
        const response = yield call(ContactDetailService.getContactDetail, action.payload)

        yield put(handleContactDetailSucess(response))
    } catch (error: any) {
        yield put(handleContactDetailFailure(error))
    }
}

function* watchHandleOrganisationDetailData(
    action: ReturnType<typeof handleOrganisationDetail>
): Generator<CallEffect<OrganisationDetailRequestParam> | PutEffect<AnyAction>, void, OrganisationDetailApiResp> {
    try {
        const response = yield call(ContactDetailService.getOrganisationDetail, action.payload)

        yield put(handleOrganisationDetailSucess(response))
    } catch (error: any) {
        yield put(handleOrganisationDetailFailure(error))
    }
}

function* watchHandleContactTimelineData(
    action: ReturnType<typeof handleContactTimeline>
): Generator<CallEffect<ContactTimelineRequestParam> | PutEffect<AnyAction>, void, ContactTimelineApiResp[]> {
    try {
        const response = yield call(ContactDetailService.getContactTimeline, action.payload)

        yield put(handleContactTimelineSucess(response))
    } catch (error: any) {
        yield put(handleContactTimelineFailure(error))
    }
}

function* watchHandlePostContactTimelineData(
    action: ReturnType<typeof handlePostContactTimeline>
): Generator<CallEffect<PostContactTimelineBodyParam> | PutEffect<AnyAction>, void, any> {
    try {
        yield call(ContactDetailService.postContactTimeline, action.payload)

        yield put(handlePostContactTimelineSucess())

        const id = localStorage.getItem('id contact')

        const value: ContactTimelineRequestParam = {
            idcontact: Number(id),
        }

        yield put(handleContactTimeline(value))
    } catch (error: any) {
        yield put(handlePostContactTimelineFailure(error))
    }
}

function* watchHandleInactiveContact(
    action: ReturnType<typeof handleInactiveContact>
): Generator<CallEffect<PostContactPersonInactiveParam> | PutEffect<AnyAction>, void, any> {
    try {
        yield call(ContactDetailService.postInactiveUser, action.payload)

        yield put(handleInactiveContactSucess())
        yield put(
            handleNotification({
                variant: 'success',
                message: 'well done!',
                info: 'user has been inactivated',
            })
        )
    } catch (error: any) {
        yield put(handleInactiveContactFailure(error))
    }
}

function* watchHandleDeleteContact(
    action: ReturnType<typeof handleDeleteContact>
): Generator<CallEffect<number> | PutEffect<AnyAction>, void, any> {
    try {
        const res = yield call(ContactDetailService.deleteContactUser, action.payload)

        yield put(handleDeleteContactSucess(res))
        yield put(
            handleNotification({
                variant: 'success',
                message: 'well done!',
                info: 'User has been deleted',
            })
        )
    } catch (error: any) {
      
        yield put(handleDeleteContactFailure(error.response.data.errorMessage))
        yield put(
            handleNotification({
                variant: 'error',
                message: 'Oh snap!',
                info: error.response.data.errorMessage,
            })
        )
    }
}

function* watchHandleContactInfoData(
    action: ReturnType<typeof handleContactInfoData>
): Generator<CallEffect<ContactInfoRequestParams> | PutEffect<AnyAction>, void, ContactInfoApiResp> {
    try {
        const response = yield call(ContactDetailService.getContactInfo, action.payload)

        yield put(handleContactInfoDataSucess(response))
    } catch (error: any) {
        yield put(handleContactInfoDataFailure(error))
    }
}

function* watchHandlePostPersonalInfoData(
    action: ReturnType<typeof handlePostPersonalInfo>
): Generator<CallEffect<PostPersonalInfoData> | PutEffect<AnyAction>, void, any> {
    try {
       
        const {name} = action.payload
     yield call(ContactDetailService.postPersonalInfo, action.payload)

        yield put(handlePostPersonalInfoSucess(name))

        yield put(
            handleNotification({
                variant: 'success',
                message: 'well done!',
                info: 'Personal info has been updated',
            })
        )

        const idContact = localStorage.getItem('id contact')
        const idOrganisation = localStorage.getItem('id organisation')

        const contactDetailValue: ContactDetailRequestParam = {
            idContactPerson: Number(idContact),
        }

        const organisationDetailValue: OrganisationDetailRequestParam = {
            idOrganisationPerson: Number(idOrganisation),
        }

        const contactTimelineValue: ContactTimelineRequestParam = {
            idcontact: Number(idContact),
        }

        const idcontact = localStorage.getItem('id contact')

        const value = {
            idContact: Number(idcontact),
            keyproperty: '',
            searchkey: '',
            pagenumber: 1
        }

        yield put(handleGetFunctionOverview(value))

        yield put(handleContactDetail(contactDetailValue))
        yield put(handleOrganisationDetail(organisationDetailValue))
        yield put(handleContactTimeline(contactTimelineValue))
    } catch (error: any) {
        yield put(handlePostPersonalInfoFailure(error))

        yield put(
            handleNotification({
                variant: 'error',
                message: 'Oh snap!',
                info: 'Personal info updatation failed',
            })
        )
    }
}

function* watchHandlePostContactDetailData(
    action: ReturnType<typeof handlePostContactDetail>
): Generator<CallEffect<PostContactDetailData> | PutEffect<AnyAction>, void, any> {
    try {
        const response = yield call(ContactDetailService.postContactDetail, action.payload)

        yield put(handlePostContactDetailSucess(response))

        yield put(
            handleNotification({
                variant: 'success',
                message: 'well done!',
                info: 'Contact detail has been updated',
            })
        )

        const idContact = localStorage.getItem('id contact')
        const idOrganisation = localStorage.getItem('id organisation')

        const contactDetailValue: ContactDetailRequestParam = {
            idContactPerson: Number(idContact),
        }

        const organisationDetailValue: OrganisationDetailRequestParam = {
            idOrganisationPerson: Number(idOrganisation),
        }

        const contactTimelineValue: ContactTimelineRequestParam = {
            idcontact: Number(idContact),
        }

        const idcontact = localStorage.getItem('id contact')

        const value = {
            idContact: Number(idcontact),
            keyproperty: '',
            searchkey: '',
            pagenumber: 1
        }

        yield put(handleGetFunctionOverview(value))

        yield put(handleContactDetail(contactDetailValue))
        yield put(handleOrganisationDetail(organisationDetailValue))
        yield put(handleContactTimeline(contactTimelineValue))
    } catch (error: any) {
        yield put(handlePostContactDetailFailure(error))

        yield put(
            handleNotification({
                variant: 'error',
                message: 'Oh snap!',
                info: 'Contact detail updation failed',
            })
        )
    }
}

function* watchHandlePostFunctionalDetailData(
    action: ReturnType<typeof handlePostFunctionalDetail>
): Generator<CallEffect<PostFunctionalDetailBodyParam> | PutEffect<AnyAction>, void, any> {
    try {
        const response = yield call(ContactDetailService.postFunctionalDetail, action.payload)

        yield put(handlePostFunctionalDetailSucess(response))

        const idcontact = localStorage.getItem('id contact')

        const value = {
            idContact: Number(idcontact),
            keyproperty: '',
            searchkey: '',
            pagenumber: 1
        }

        yield put(handleGetFunctionOverview(value))

        yield put(
            handleNotification({
                variant: 'success',
                message: 'well done!',
                info: 'Function detail has been updated',
            })
        )

        const idContact = localStorage.getItem('id contact')
        const idOrganisation = localStorage.getItem('id organisation')

        const contactDetailValue: ContactDetailRequestParam = {
            idContactPerson: Number(idContact),
        }

        const organisationDetailValue: OrganisationDetailRequestParam = {
            idOrganisationPerson: Number(idOrganisation),
        }

        const contactTimelineValue: ContactTimelineRequestParam = {
            idcontact: Number(idContact),
        }

        yield put(handleContactDetail(contactDetailValue))
        yield put(handleOrganisationDetail(organisationDetailValue))
        yield put(handleContactTimeline(contactTimelineValue))
    } catch (error: any) {
        yield put(handlePostFunctionalDetailFailure(error))

        yield put(
            handleNotification({
                variant: 'error',
                message: 'Oh snap!',
                info: 'Contact detail updation failed',
            })
        )
    }
}

function* watchHandleGetFunctionOverviewData(
    action: ReturnType<typeof handleGetFunctionOverview>
): Generator<CallEffect<GetFunctionQueryParams> | PutEffect<AnyAction>, void, FunctionOverviewApiResp> {
    try {
        const response = yield call(ContactDetailService.getFunctionOverview, action.payload)

        yield put(handleGetFunctionOverviewSucess(response))
    } catch (error: any) {
        yield put(handleGetFunctionOverviewFailure(error))
    }
}

function* watchHandleAddFunctionData(
    action: ReturnType<typeof handleAddFunction>
): Generator<CallEffect<AddFunctionBodyParams> | PutEffect<AnyAction>, void, any> {
    try {
        yield call(ContactDetailService.postFunction, action.payload)

        yield put(handleAddFunctionSucess())

        const value = {
            idContact: action.payload.idPerson,
            keyproperty: '',
            searchkey: '',
            pagenumber: 1
        }

        const idContact = localStorage.getItem('id contact')

        const timelineParam: ContactTimelineRequestParam = {
            idcontact: Number(idContact),
        }

        yield put(handleGetFunctionOverview(value))

        yield put(handleContactTimeline(timelineParam))

        yield put(
            handleNotification({
                variant: 'success',
                message: 'well done!',
                info: 'Function has been created',
            })
        )
    } catch (error: any) {
        yield put(handleAddFunctionFailure(error))
        yield put(
            handleNotification({
                variant: 'error',
                message: 'Oh snap!',
                info: error.response.data.errorMessage,
            })
        )
    }
}

function* watchHandleEditFunctionData(
    action: ReturnType<typeof handleEditFunction>
): Generator<CallEffect<EditFunctionBodyParams> | PutEffect<AnyAction>, void, any> {
    try {
        yield call(ContactDetailService.editFunction, action.payload)

        yield put(handleEditFunctionSucess())

        const value = {
            idContact: action.payload.idPerson,
            keyproperty: '',
            searchkey: '',
            pagenumber: 1
        }

        yield put(handleGetFunctionOverview(value))

        const idContact = localStorage.getItem('id contact')

        const timelineParam: ContactTimelineRequestParam = {
            idcontact: Number(idContact),
        }

        yield put(handleContactTimeline(timelineParam))

        yield put(
            handleNotification({
                variant: 'success',
                message: 'well done!',
                info: 'Function has been updated',
            })
        )
    } catch (error: any) {
        yield put(handleEditFunctionFailure(error))
        yield put(
            handleNotification({
                variant: 'warning',
                message: 'Oh snap!',
                info: error.response.data.errorMessage,
            })
        )
    }
}

function* watchHandleDeleteFunctionData(
    action: ReturnType<typeof handleDeleteFunction>
): Generator<CallEffect<number> | PutEffect<AnyAction>, void, any> {
    try {
        yield call(ContactDetailService.deleteFunction, action.payload)

        yield put(handleDeleteFunctionSucess())

        const idContact = localStorage.getItem('id contact')

        const value = {
            idContact: Number(idContact),
            keyproperty: '',
            searchkey: '',
            pagenumber: 1
        }

        yield put(handleGetFunctionOverview(value))

        const timelineParam: ContactTimelineRequestParam = {
            idcontact: Number(idContact),
        }

        yield put(handleContactTimeline(timelineParam))

        yield put(
            handleNotification({
                variant: 'success',
                message: 'well done!',
                info: 'Function has been deleted',
            })
        )
    } catch (error: any) {
        yield put(handleDeleteFunctionFailure(error))
        yield put(
            handleNotification({
                variant: 'warning',
                message: 'Oh snap!',
                info: error.response.data.errorMessage,
            })
        )
    }
}

function* watchHandleAddCommentTimelineData(
    action: ReturnType<typeof handleAddCommentTimeline>
): Generator<CallEffect<AddCommentTimelineBodyParam> | PutEffect<AnyAction>, void, any> {
    try {
        yield call(ContactDetailService.addCommentTimeline, action.payload)

        yield put(handleAddCommentTimelineSucess())

        const value: ContactTimelineRequestParam = {
            idcontact: action.payload.contactid,
        }

        yield put(handleContactTimeline(value))

        yield put(
            handleNotification({
                variant: 'sucess',
                message: 'well done!',
                info: 'New comment added',
            })
        )
    } catch (error: any) {
        yield put(handleAddCommentTimelineFailure(error))
    }
}

function* watchHandleSecretaryDropdownData(
    action: ReturnType<typeof handleSecretaryDropdown>
): Generator<CallEffect<ContactRequestParams> | PutEffect<AnyAction>, void, SecretaryDropdownApiResp> {
    try {
        const resp = yield call(ContactDetailService.getSecretaryDropdown, action.payload)

        yield put(handleSecretaryDropdownSucess(resp))
    } catch (error: any) {
        yield put(handleSecretaryDropdownFailure(error))
    }
}

const contactSaga = [
    takeLatest(handleContactDetail, watchHandleContactDetailData),
    takeLatest(handleOrganisationDetail, watchHandleOrganisationDetailData),
    takeLatest(handleContactTimeline, watchHandleContactTimelineData),
    takeLatest(handlePostContactTimeline, watchHandlePostContactTimelineData),
    takeLatest(handleInactiveContact, watchHandleInactiveContact),
    takeLatest(handleDeleteContact, watchHandleDeleteContact),
    takeLatest(handleContactInfoData, watchHandleContactInfoData),
    takeLatest(handlePostPersonalInfo, watchHandlePostPersonalInfoData),
    takeLatest(handlePostContactDetail, watchHandlePostContactDetailData),
    takeLatest(handlePostFunctionalDetail, watchHandlePostFunctionalDetailData),
    takeLatest(handleGetFunctionOverview, watchHandleGetFunctionOverviewData),
    takeLatest(handleAddFunction, watchHandleAddFunctionData),
    takeLatest(handleEditFunction, watchHandleEditFunctionData),
    takeLatest(handleDeleteFunction, watchHandleDeleteFunctionData),
    takeLatest(handleAddCommentTimeline, watchHandleAddCommentTimelineData),
    takeLatest(handleSecretaryDropdown, watchHandleSecretaryDropdownData),
]

export default contactSaga
