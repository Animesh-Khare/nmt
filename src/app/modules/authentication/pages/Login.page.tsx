import React from 'react'
import { Grid } from '@mui/material'
// import MSLogoSvg from '@assets/images/msLogo.svg'
// import smartLayerLogo from '@assets/images/smartlayer-logo-dark.svg'
import './Login.css'

const LoginPage: React.FC = () => {
    const handleLoginClick = (): void => {
        const loginURL = process.env.REACT_APP_LOGIN_URL
        if (loginURL) {
            window.location.href = loginURL
        }
    } 

    return (
        <Grid container style={{ minHeight: '100vh' }}>
            <Grid item xs={12} md={6} sm={12} className="leftRoot">
                <div className="leftContentWrapper">
                    <label className="headerLabel">NMT CRM</label>
                    <label className="subHeader">
                        Powered by Nimble Smart Layer <sup className="super-script">TM</sup>{' '}
                        technologies
                    </label>
                    <br />
                    <label className="description">
                        The Nimble Smart Layer empowers people with the most advanced technologies to easily automate,
                        analyze and integrate data. It offers inifinite possibilities in one highly efficient layer on
                        top of all core systems.
                    </label>
                </div>
            </Grid>
            <Grid item xs={12} md={6} sm={12} className="rightRoot">
                <div className="rightContent">
                    <div className="text_container_div">
                        <span className="welcome_text">Welcome!</span>
                        <span className="intro_text">Login with your NMT microsoft account</span>
                    </div>
                    <div className="btn_container_div">
                        <button className="btn_tag" onClick={handleLoginClick}>
                            Login with Microsoft
                        </button>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default LoginPage
