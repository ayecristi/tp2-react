import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import DashboardHome from './views/DashboardHome';
import ProfileView from './views/ProfileView';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="profile/:id" element={<ProfileView />} />
                    <Route path="json-explorer" element={<h2>Módulo: Datos Locales (JSON)</h2>} />
                    <Route path="api-explorer" element={<h2>Módulo: Integración API Externa</h2>} />
                    <Route path="gallery" element={<h2>Galería Interactiva</h2>} />
                    <Route path="logbook" element={<h2>Bitácora de Proyecto</h2>} />
                    <Route path="*" element={<h2>Error 404: Página no encontrada</h2>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;