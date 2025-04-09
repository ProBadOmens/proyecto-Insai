import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layouts/MainLayout';
import Error from './pages/Error/Error';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Empleados from './pages/Empleados/Empleados';
import Usuarios from './pages/Usuario/Usuario';
import Productor from './pages/Productor/Productor';
import Vegetal from './pages/Vegetal/Vegetales';
import Chart from './pages/Chart/Chart';
import Bitacora from './pages/Bitacora/Bitacora';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: Login */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas con el layout principal */}
        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Empleados"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Empleados />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Usuario"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Usuarios />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Productor"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Productor />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Vegetal"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Vegetal />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Chart"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Chart />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Bitacora"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Bitacora />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Ruta para manejar errores */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;