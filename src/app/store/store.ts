import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { combineReducers } from 'redux'

// import Reactotron from '@config/Reactotron.config'
import rootSaga from '@store/saga'
import authenticationReducer from '@authentication/store/authentication.slice'
import userReducer from '@users/store/user.slice'
import generalSliceReducer from '@store/generalStore/general.slice'
import organisationReducer from '@organisations/store/organisation.slice'
import contactReducer from '@contacts/store/contactStore/contact.slice'
import contactDetailReducer from '@contacts/store/contactDetailStore/contactDetail.slice'


// const NODE_ENV = process.env.NODE_ENV
const sagaMiddleware = createSagaMiddleware()

const middlewares: any[] = [sagaMiddleware]

const reducers = combineReducers({
    authentication: authenticationReducer,
    user: userReducer,
    generalActionData: generalSliceReducer,
    organisation: organisationReducer,
    contact: contactReducer,
    contactDetail: contactDetailReducer
})

export const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: middlewares,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // enhancers: NODE_ENV === 'development' ? [Reactotron.createEnhancer!()] : undefined,
})

sagaMiddleware.run(rootSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
