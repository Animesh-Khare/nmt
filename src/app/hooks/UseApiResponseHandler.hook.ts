import { useEffect } from 'react'

import usePrevious from './UsePrevious.hook'

const useApiResponseHandler = (flag: boolean, error: any, callBackFun: () => void, errorCallback: () => void): void => {
    const prevFlag = usePrevious(flag)

    useEffect(() => {
        if (prevFlag && !flag) {
            if (!error) {
                callBackFun()
            } else {
                if (errorCallback) {
                    errorCallback()
                }
            }
        }
    }, [flag, error, callBackFun, prevFlag, errorCallback])
}

export default useApiResponseHandler
