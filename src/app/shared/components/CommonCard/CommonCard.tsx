import React from 'react'
import Box from '@mui/material/Box'



const CommonCard: React.FC<{children:React.ReactNode}> = ({children}) => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                padding: '16px',
                borderRadius: '8px',
                background: '#FFFFFE',
                boxShadow: '0px 10px 24px 0px rgba(12, 27, 42, 0.06)',
                height: '100%'
            }}
        >
            {children}
        </Box>
    )
}

export default CommonCard
