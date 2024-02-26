import { all } from '@redux-saga/core/effects'

import authenticationSaga from '@authentication/store/authentication.saga'
import usersSaga from '@users/store/user.saga'
import organisationSaga from '@organisations/store/organisation.saga'
import contactSaga from '@contacts/store/contactStore/contact.saga'
import contactDetailSaga from '@contacts/store/contactDetailStore/contactDetail.saga'

function* rootSaga(): any {
    yield all([...authenticationSaga, ...usersSaga, ...organisationSaga, ...contactSaga, ...contactDetailSaga])
}

export default rootSaga
