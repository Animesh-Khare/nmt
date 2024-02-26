import { Outlet, Navigate } from 'react-router-dom'

import MainLayout from '@layout/MainLayout'
import { getWithExpiry } from '@shared/services/LocalStorage'

const PrivateRoutes: React.FC = () => {
    const token = getWithExpiry('console_admin_token')
    // debugger
    const isSignedIn = !!token
    return isSignedIn ? (
        <>
            <MainLayout />
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" replace />
    )
}

export default PrivateRoutes
