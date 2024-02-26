import React, { useEffect, useState } from 'react'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'

import styles from './LineTime.module.css'

// images
import Ellipse from '@assets/images/contacts/Ellipse.svg'
import timelineUser from '@assets/images/Timeline/timelineUser.svg'
import timelineActiveUser from '@assets/images/Timeline/timelineNewUser.svg'
import timelineMsg from '@assets/images/Timeline/timelineMsg.svg'
import timelineMsgActive from '@assets/images/Timeline/timelineNewMsg.svg'
import timelineOrangeMsg from '@assets/images/Timeline/timelineOrangeMsg.svg'
// import timelineOrangeMsgActive from '@assets/images/Timeline/timelineNewOrangeMsg.svg'
import plusIcon from '@assets/images/Timeline/plusIcon.svg'

import organisationMember from '@assets/images/Timeline/OrganisationTimeLineMsg.svg'
import organisationMemberActive from '@assets/images/Timeline/OrganisationTimeLineNewMsg.svg'

// type
import {
    AddCommentTimelineBodyParam,
    ContactTimelineApiResp,
    PostContactTimelineBodyParam,
} from '@app-types/ContactDetailResponse.types'
import {
    PostOrganisationTimelineBodyParam,
    AddCommentOrganisationTimelineBodyParam,
} from '@app-types/OrganisationResponse.types'
import { NimbleDialog } from 'nimble-design-system'
import { useDispatch } from 'react-redux'

import {
    handlePostContactTimeline,
    handleAddCommentTimeline,
} from '@contacts/store/contactDetailStore/contactDetail.slice'
import {
    handlePostOrganisationTimeline,
    handleOrganisationAddCommentTimeline,
} from '@organisations/store/organisation.slice'

import { useLocation } from 'react-router-dom'

import moment from 'moment'

//
// import {NimbleDialog} from 'nimble-design-system'

interface PropType {
    timelineData: ContactTimelineApiResp[] | null
    ComponentType?: string
}

const BasicTimeline: React.FC<PropType> = ({ timelineData, ComponentType }) => {
 
    const dispatch = useDispatch()
    const location = useLocation() 

    const { idContact, idOrganisation } = location.state
    const [openDialog, setOpenDialog] = useState(false)
    const [addCommentDialog, setAddCommentDialog] = useState(false)
    const [dialogComnt, setDialogComnt] = useState('')
    const [addedComnt, setAddedComnt] = useState('')
    const [idTimeline, setIdTimeline] = useState(0)
    const [allIconActive, setAllIconActive] = useState(false)
    const [comntIconActive, setComntIconActive] = useState(false)
    const [leadIconActive, setLeadIconActive] = useState(false)

    const [data, setData] = useState(timelineData)

    useEffect(() => {
        setData(timelineData)
    }, [timelineData])

    const filteredComment = timelineData?.filter((item) => {
        return item.action === 'New comment'
    })

    const filteredFunction = timelineData?.filter((item) => {
        if(item.action === 'New function'){
            return item.action === 'New function'
        }
       else{
        return item.action === 'Update in contact persons'
       }
        
    })

   

    const allToggleHandler = (): void => {
        setAllIconActive(!allIconActive)
        setComntIconActive(false)
        setLeadIconActive(false)
    }

    const comntToggleHandler = (): void => {
    

        setComntIconActive(!comntIconActive)

        setAllIconActive(false)
        setLeadIconActive(false)
    }

    useEffect(() => {
        if (allIconActive) {
            setData(filteredFunction ?? [])
        } else if (!allIconActive) {
            setData(timelineData)
        }
    }, [allIconActive])

    useEffect(() => {
        if (comntIconActive) {
            setData(filteredComment ?? [])
        } else {
            setData(timelineData)
        }
    }, [comntIconActive])

    const openTimeLineDialog = (description: string, idtimeline: number, action: string): void => {
     
        setDialogComnt(description)
        setIdTimeline(idtimeline)

        if (action === 'New comment') {
            setOpenDialog(true)
        }
    }

    const closeDialogHandler = (): void => {
        setOpenDialog(false)
    }

    const DialogComntHandler = (value: string): void => {
        setDialogComnt(value)
    }

    const AddComntHandler = (value: string): void => {
        setAddedComnt(value)
    }

    const NimbleDialogSubmitHandler = (): void => {
     
        const user = localStorage.getItem('user name')

        if (ComponentType) {
            const initialValue: PostOrganisationTimelineBodyParam = {
                actionId: idTimeline,
                description: dialogComnt,
                username: user ?? '',
            }

            dispatch(handlePostOrganisationTimeline(initialValue))
        } else {
            const initialValue: PostContactTimelineBodyParam = {
                ActionId: idTimeline,
                description: dialogComnt,
                username: user ?? '',
            }
            dispatch(handlePostContactTimeline(initialValue))
        }

        closeDialogHandler()
    }

    const addCommentHandler = (): void => {
        setAddCommentDialog(true)
    }

    const closeAddCommentDialog = (): void => {
        setAddCommentDialog(false)
    }

    const addCommentSubmitHandler = (): void => {
        const username = localStorage.getItem('user name')

        if (ComponentType) {
            const initialValue: AddCommentOrganisationTimelineBodyParam = {
                description: addedComnt,
                username: username ?? '',
                organization: idOrganisation ?? 0,
            }
            dispatch(handleOrganisationAddCommentTimeline(initialValue))
        } else {
            const initialValue: AddCommentTimelineBodyParam = {
                description: addedComnt,
                username: username ?? '',
                contactid: idContact ?? 0,
            }

            dispatch(handleAddCommentTimeline(initialValue))
        }

        closeAddCommentDialog()
    }

    return (
        <div className={styles.timeline_parent_div}>
            <div className={styles.icon_container}>
                <div className={styles.three_icons}>
                    <img
                        src={allIconActive ? timelineActiveUser : timelineUser}
                        alt=""
                        // className={`${allIconActive ? styles.all_icon_active : ''}`}
                        onClick={allToggleHandler}
                    ></img>
                    <img
                        src={comntIconActive ? timelineMsgActive : timelineMsg}
                        alt=""
                        onClick={comntToggleHandler}
                        // className={`${comntIconActive ? styles.comnt_icon_active : ''}`}
                    ></img>
                    {/* <img src={timelineOrangeMsg} alt="" onClick={leadToggleHandler}></img> */}
                    {ComponentType ? (
                        <img
                            src={leadIconActive ? organisationMemberActive : organisationMember}
                            alt=""
                            // onClick={leadToggleHandler}
                        ></img>
                    ) : (
                        <img
                            src={timelineOrangeMsg}
                            alt=""
                            // onClick={leadToggleHandler}
                        ></img>
                    )}
                </div>

                <img src={plusIcon} alt="" onClick={addCommentHandler}></img>
            </div>
            <Timeline>
                {data?.map((item: any) => (
                    <TimelineItem key={item.idtimeline}>
                        <TimelineOppositeContent sx={{ flex: 0, padding: '0px' }} color="textSecondary">
                            {/* 09:30 am */}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot style={{ background: '#C8DBE9', margin: '0px' }} />

                            <TimelineConnector style={{ background: '#C8DBE9' }} />
                        </TimelineSeparator>
                        <TimelineContent>
                            <div className={styles.date_content}>{moment(item.date).format('DD-MM-YYYY')}</div>
                            <div
                                className={
                                    item.action === 'New secretary'
                                        ? styles.secretary
                                        : item.action === 'New function' || item.action === 'Update in contact persons'
                                        ? styles.function
                                        : item.action === 'New comment'
                                        ? styles.comment
                                        : ''
                                }
                                onClick={() => {
                                    openTimeLineDialog(item.description, item.idtimeline, item.action)
                                }}
                            >
                                <div className={styles.action}>{item.action}</div>
                                <div className={styles.description}>{item.description}</div>
                            </div>
                            <div className={styles.time_content}>
                                {item.username}&nbsp;<img src={Ellipse} alt=""></img> &nbsp;{item.time}
                            </div>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
            {/* <NimbleDialog open={} maxWidth={'sm'} title='Details Peter Baker' parimaryActionLabel='save' onClickClose={} topActionPanel={true}> */}
            <NimbleDialog
                open={openDialog}
                maxWidth={'sm'}
                title="Comment"
                parimaryActionLabel="save"
                onClickClose={closeDialogHandler}
                onClickPrimaryAction={NimbleDialogSubmitHandler}
                fontFamily="Raleway"
            >
                <div className={styles.dialog_child}>
                    <div className={styles.comnt_text}>Comment</div>
                    <textarea
                        className={styles.textarea_tag}
                        value={dialogComnt}
                        onChange={(e) => {
                            DialogComntHandler(e.target.value)
                        }}
                    ></textarea>
                </div>
            </NimbleDialog>

            {/* add comment dialog */}

            <NimbleDialog
                open={addCommentDialog}
                maxWidth={'sm'}
                title="Comment"
                parimaryActionLabel="save"
                onClickClose={closeAddCommentDialog}
                onClickPrimaryAction={addCommentSubmitHandler}
                fontFamily="Raleway"
            >
                <div className={styles.dialog_child}>
                    <div className={styles.comnt_text}>Comment</div>
                    <textarea
                        className={styles.textarea_tag}
                        value={addedComnt}
                        onChange={(e) => {
                            AddComntHandler(e.target.value)
                        }}
                    ></textarea>
                </div>
            </NimbleDialog>
        </div>
    )
}

export default BasicTimeline
