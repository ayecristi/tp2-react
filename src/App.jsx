import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import DashboardHome from './views/DashboardHome';
import ProfileView from './views/ProfileView';
import ProjectLogbook from './views/ProjectLogbook';
import ProjectsExplorer from './views/ProjectsExplorer';
import SpaceGallery from './views/SpaceGallery';
import SystemMap from './views/SystemMap';
import NotFound from './views/NotFound';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="profile/:member" element={<ProfileView />} />
                    <Route path="logbook" element={<ProjectLogbook />} />
                    <Route path="projects" element={<ProjectsExplorer />} />
                    <Route path="space-gallery" element={<SpaceGallery />} />
                    <Route path="system-map" element={<SystemMap />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;