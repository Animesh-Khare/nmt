import React from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

interface PagelayoutProps {
    children: React.ReactNode
} 

const Pagelayout: React.FC<PagelayoutProps> = ({ children }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                paddingLeft: isMobile ? '12px' : isTablet ? '32px' : '64px',
                paddingRight: isMobile ? '12px' : isTablet ? '32px' : '64px',
                paddingTop: isMobile ? '120px' : '32px',
                background: '#FAFAFA',
                minHeight: '100vh',
            }}
        >
            {children}
        </Box>
    )
}

export default Pagelayout
