import React from 'react'
import MainRoutes from '@routes/Main.route'
import './App.css'

import Toast from '@shared/components/toast/Toast'

const App: React.FC = () => {
    return (
        <div style={{ height: '100vh' }}>
            <MainRoutes />
            <Toast position={'top-right'} autoDelete={true} autoDeleteTime={3000} />
        </div>
    )
}

export default App
