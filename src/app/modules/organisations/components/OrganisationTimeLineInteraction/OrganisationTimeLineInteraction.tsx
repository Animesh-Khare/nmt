import React from 'react'
import styles from './OrganisationTimeLineInteraction.module.css'

import BasicTimeline from '@shared/components/LineTime/LineTime'
import CommonCard from '@shared/components/CommonCard/CommonCard'

import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { useSelector } from 'react-redux'
import { RootState } from '@store/store'

const OrganisationTimelineInteraction: React.FC = () => {
    const theme = useTheme()

    const timelineData = useSelector((state: RootState) => state.organisation.organisationTimelineData)

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <div className={`${styles.parent_div} ${isMobile || isTablet ? styles.addMargin : ''}`}>
            <div className={styles.card_heading}>Timeline & interactions</div>
            <CommonCard>
                <BasicTimeline timelineData={timelineData} ComponentType="Organisation" />
            </CommonCard>
        </div>
    )
}

export default OrganisationTimelineInteraction
