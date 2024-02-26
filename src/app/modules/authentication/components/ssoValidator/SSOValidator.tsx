import React, { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getToken } from '@authentication/store/authentication.slice'
import { RootState } from '@store/store'
import useApiResponseHandler from '@hooks/UseApiResponseHandler.hook'

const SSOValidator: React.FC = () => {
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // debugger;
    const userInfoLoading = useSelector((state: RootState) => state.authentication.getUserInfoLoading)

    const isAuthorized = useSelector((state: RootState) => state.authentication.getUserInfoData?.isFound)

    const userInfoError = useSelector((state: RootState) => state.authentication.getUserInfoError)

    const handleError = (): void => {
        navigate('/login', { replace: true })
    }

    const handleSuccessUserInfo = (): void => {
        if (isAuthorized) {
            navigate('/overview', { replace: true })
        } else {
            navigate('/login', { replace: true })
        }
    }

    useApiResponseHandler(userInfoLoading, userInfoError, handleSuccessUserInfo, handleError)

    useEffect(() => {
        const code = searchParams.get('code')
        if (code) {
            const redirectUrl = process.env.REACT_APP_REDIRECT_URL ?? 'http://localhost:3000'
            dispatch(getToken({ redirectUrl, code }))
        } else {
            navigate('/login', { replace: true })
        }
    }, [searchParams])
  
    return (
        <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress size={50} />
        </Box>
    )
}

export default SSOValidator
