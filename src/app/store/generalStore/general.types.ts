import { ToastProperties } from '@app-types/ToastParam.types'

interface GeneralState {
    notificationData: ToastProperties | null

    authorizedStatus: number | null
}

export type { GeneralState }
