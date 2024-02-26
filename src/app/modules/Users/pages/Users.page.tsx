import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// css
import styles from './Users.page.module.css'

// components
import Pagelayout from '@layout/PageLayout'
import UserTable from '@users/components/UserTable/UserTable'
import CommonHeaderComponent from '@shared/components/CommonHeaderComponent/CommonHeaderComponent'
import UserDisplayMobile from '@users/components/UserDisplayMobile/UserDisplayMobile'
import { Hidden } from '@mui/material'

import { handleUser, handleUserRole } from '@users/store/user.slice'

import { UserRequestParams } from '@app-types/UserResponse.types'

// from mui
import useMediaQuery from '@mui/material/useMediaQuery'

const userRequestParam: UserRequestParams = {
    searchkey: '',
    Name: '',
    Email: '',
    Autherization: '',
    searchrole: '',
    Keyproperty: 'Name',
    isAscending: true,
    pagenumber: 1,
}
  
const Userspage: React.FC = () => {
    const dispatch = useDispatch()
    const matches = useMediaQuery('(max-width:600px)')
    const isMediumScreen = useMediaQuery('(min-width:601px) and (max-width:960px)')

    useEffect(() => {
        dispatch(handleUser(userRequestParam))
        dispatch(handleUserRole())
    }, [])

    return (
        <Pagelayout>
            <div
                className={`${styles.common_header_component_container} ${matches ? styles.AddPadding : ''} ${
                    isMediumScreen ? styles.TopMargin : ''
                }`}
            >
                <CommonHeaderComponent
                    heading="Users"
                    para="Manage all users"
                    goBackImg=""
                    goBackText=""
                    goBackClickHandler={() => {}}
                />
            </div>

            <br />

            <Hidden only={['lg', 'md', 'xl', 'sm']}>
                <UserDisplayMobile />
            </Hidden>

            <Hidden only={['xs']}>
                {/* <div className={styles.user_table_container}> */}
                <UserTable />
                {/* </div> */}
            </Hidden>
        </Pagelayout>
    )
}

export default Userspage
