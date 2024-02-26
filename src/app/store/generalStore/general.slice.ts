import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ToastProperties } from '@app-types/ToastParam.types'
import { GeneralState } from '@store/generalStore/general.types'

const initialGeneralState: GeneralState = {
    notificationData: null,
    authorizedStatus: null,
}

const generalSlice = createSlice({
    name: 'generalSlice',
    initialState: initialGeneralState,
    reducers: {
        handleNotification(state, action: PayloadAction<ToastProperties>) {
            state.notificationData = action.payload
        },

        handleExistingAuthentication(state, action: PayloadAction<number>) {
            state.authorizedStatus = action.payload
        },
    },
})

export const { handleNotification, handleExistingAuthentication } = generalSlice.actions
export default generalSlice.reducer
