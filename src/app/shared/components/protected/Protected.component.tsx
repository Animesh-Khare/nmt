import React from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
    isSignedIn: boolean
    children: JSX.Element
}

const Protected: React.FC<Props> = ({ isSignedIn, children }) => {
    if (!isSignedIn) {
        return <Navigate to="/login" replace />
    }
    return children
}
export default Protected
