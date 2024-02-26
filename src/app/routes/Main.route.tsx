import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import loadable from '@loadable/component'
import Box from '@mui/material/Box'
import PrivateRoutes from './Private.route'
import SSOValidator from '@authentication/components/ssoValidator/SSOValidator'

const LoginPage = React.lazy(async () => await import('@authentication/pages/Login.page'))

const NotFoundPage = loadable(async () => import('@shared/components/notFound/NotFound.component'), {
    resolveComponent: (components) => components.default,
})

const ClientsPage = loadable(async () => import('@dashboard/pages/Dashboard.page'), {
    resolveComponent: (components) => components.default,
})
const UsersPage = loadable(async () => import('@users/pages/Users.page'), {
    resolveComponent: (components) => components.default,
})

const MembershipOverview = loadable(async () => import('@users/pages/MembershipOverview/MembershipOverview'))

const ContactPage = loadable(async () => import('@contacts/pages/Contacts/Contacts.page'), {
    resolveComponent: (components) => components.default,
})

const ContactPersonDetail = loadable(async () => import('@contacts/pages/ContactPersonDetails/ContactPersonDetail'))

const Organisationspage = loadable(async () => import('@organisations/pages/Organisation/Organisations.page'), {
    resolveComponent: (components) => components.default,
})
const OrganisationOverview = loadable(
    async () => import('@organisations/pages/OrganisationOverview/OrganisationOverview.page')
)
const ProjectsPage = loadable(async () => import('@projects/pages/Projects.page'), {
    resolveComponent: (components) => components.default,
})
const Leadspage = loadable(async () => import('@leads/pages/Leads.page'), {
    resolveComponent: (components) => components.default,
})

const Loading: React.FC = () => <p>Loading ...</p>

const BASE_PATH = process.env.REACT_APP_BASE_PATH

const MainRoutes: React.FC = () => {
    return (
        <React.Suspense fallback={<Loading />}>
            <BrowserRouter basename={BASE_PATH}>
                <Box sx={{ display: 'flex' }}>
                    <Routes>
                        <Route element={<SSOValidator />} path="/" />
                        <Route element={<PrivateRoutes />}>
                            <Route element={<ClientsPage />} path="/overview"></Route>
                            <Route element={<UsersPage />} path="/users" />
                            <Route element={<MembershipOverview />} path="/membershipOverview" />
                            <Route element={<ContactPage />} path="/contacts" />
                            <Route element={<ContactPersonDetail />} path="/contactPersonDetail" />
                            <Route element={<Organisationspage />} path="/organisations" />
                            <Route element={<OrganisationOverview />} path="/organisationOverview" />
                            <Route element={<ProjectsPage />} path="/projects" />
                            <Route element={<Leadspage />} path="/leads" />
                        </Route>
                        <Route element={<LoginPage />} path="/login" />
                        <Route element={<NotFoundPage />} path="*" />
                    </Routes>
                </Box>
            </BrowserRouter>
        </React.Suspense>
    )
}

export default MainRoutes
