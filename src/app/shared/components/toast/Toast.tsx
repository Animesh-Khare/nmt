import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './Toast.css'

import { RootState } from '@store/store'
import { ToastProperties } from '@app-types/ToastParam.types'
import sucess_icon from '@assets/images/notification/sucess_icon.svg'
import warning_icon from '@assets/images/notification/warning_icon.svg'
import error_icon from '@assets/images/notification/error_icon.svg'

interface StatusObject {
    success: string;
    warning: string;
    error: string;
    [key: string]: string;
  }

const Icon:StatusObject = {
    success: sucess_icon,
    warning: warning_icon,
    error: error_icon,
}

const BackgrondColour: StatusObject = {
    success: 'rgba(180, 215, 75, 0.9)',
    warning: 'rgba(236, 158, 41, 0.9)',
    error: 'rgba(236, 76, 41, 0.9)',
}

const Toast: React.FC<{
    position: string
    autoDelete: boolean
    autoDeleteTime: number
}> = (props) => {
    const { position, autoDelete, autoDeleteTime } = props
    const toastList = useSelector((state: RootState) => state.generalActionData.notificationData)

    const [list, setList] = useState<ToastProperties | null>(toastList)

    useEffect(() => {
        // const newList = list
        // if (toastList) newList?.push(toastList)
        setList(toastList)
    }, [toastList])

    useEffect(() => {
        const interval = setInterval(() => {
            // if (autoDelete && list?.length) {
            //     deleteToast(toastList?.id)
            // }

            if (autoDelete && list) setList(null)
        }, autoDeleteTime)

        return () => {
            clearInterval(interval)
        }
    }, [autoDelete, autoDeleteTime, list])

    // const deleteToast = (id): void => {
    //     // debugger
    //     if (list) {
    //         const listItemIndex = list.findIndex((e) => e.id === id)
    //         // const toastListItem = toastList.findIndex((e) => e.id === id)
    //         list.splice(listItemIndex, 1)
    //         // toastList.splice(toastListItem, 1)
    //         setList([...list])
    //     }
    // }

    return (
        <>
            {list && (
                <div className={`notification-container ${position}`}>
                    {/* {list?.map((toast, i) => ( */}
                    <div
                        className={`notification toast ${position}`}
                        style={{ backgroundColor: BackgrondColour[list.variant] }}
                    >
                        {/* <div className="notification-icon-container">
                             <div className="notification-icon-sub-container">
                                <img src={toast.icon}></img>
                            </div>
                        </div> */}
                        <img src={Icon[list.variant]}></img>
                        <div className="notification-content">
                            <p className="notification-title">{list.message}</p>
                            <p className="notification-message">{list.info}</p>
                        </div>
                    </div>
                    {/* ))} */}
                </div>
            )}
        </>
    )
}

export default React.memo(Toast)
